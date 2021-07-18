import React, { useState, useCallback, useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as yup from 'yup';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { AddPropertyToProduct } from '../../components/add-property-to-product';
import { Thumb } from '../../components/thumb';
import { PriceFormatInput } from '../../components/price-format-input';
import { getDateOfChange, postItemsToDatabase, putItemsToDatabase, storage } from '../../services';

import {
  theme,
  themeUploadBtn,
  useAddItemInputStyles,
  useAddItemLabelStyles,
  useAddItemTextareaStyles,
  useSaveButtonStyles,
  useUploadButtonStyles,
} from '../../styles/customizing-material-ui-components';

import './add-item.scss';

const AddItem = ({
  properties,
  productsError,
  itemId,
  editingProduct,
  clearSelectedProduct,
  createdProduct,
  editedProduct,
  productsSpinnerOpen,
  productsSpinnerClose,
}) => {
  const [image, setImage] = useState(null);

  const classesLabel = useAddItemLabelStyles();
  const classesInput = useAddItemInputStyles();
  const classesSaveBtn = useSaveButtonStyles();
  const classesUploadBtn = useUploadButtonStyles();
  const classesTextarea = useAddItemTextareaStyles();

  // отображенире цены происходит с пробелами чсерез каждых три символа
  const priceFormat = (value) => {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  };

  // Создаем массив "уникальных" свойсв, который включает в себя все свойства с сервера и свойства товара,
  // которых нет на сервере (т.е. товар был создан с свойствами, которые в последствии были удалены с сервреа).
  const createUniqueProperties = (allProperties, propertiesOfProduct) => {
    // Если товав не имеет свойств, то возвращаем все свойства с сервера
    if (!propertiesOfProduct) {
      return allProperties;
    }
    // Находим все свойства товара, которых нет в общем массиве свойств на сервере
    const uniqueResultTwo = propertiesOfProduct.filter(function (obj) {
      return !allProperties.some(function (obj2) {
        return obj.id === obj2.id;
      });
    });

    // Добавляем ко всем свойствам, свойства найденные в товаре, но которых нет на сервере
    return allProperties.concat(uniqueResultTwo);
  };

  const validationSchema = yup.object().shape({
    itemName: yup.string().typeError('Должно быть строкой').trim('Без паробелов').required('Обязательное поле'),
    price: yup
      .number()
      .typeError('Должно быть числом')
      .integer('Должно быть целым числом')
      .test('firstSymbol', 'Стоимость не должна ровняться нулю', (value) => {
        return value?.toString().charAt(0) !== '0'; // число НЕ должно быть 0
      })
      .required('Обязательное поле'),
    file: itemId
      ? // если есть ID продукта, то повторная загрузка картинки не обязательна

      yup
        .object()
        .shape({
          file: yup.mixed().test('fileSize', 'Размер файла не должен превышать 150кб', (value) => {
            if (!value) return false;
            return value.size < 153600;
          }),
          type: yup
            .string()
            .oneOf(
              ['image/jpeg', 'image/png', 'image/pjpeg'],
              'Добавьте файл с правильным форматом .jpg,.jpeg,.png',
            ),
          name: yup.string(),
        })
        .nullable()
        .typeError('Добавьте файл')

      :
      yup
        .object()
        .shape({
          file: yup
            .mixed()
            .test('fileSize', 'Размер файла не должен превышать 150кб', (value) => {
              if (!value) return false;
              return value.size < 153600;
            })
            .required(),
          type: yup
            .string()
            .oneOf(
              ['image/jpeg', 'image/png', 'image/pjpeg'],
              'Добавьте файл с правильным форматом .jpg,.jpeg,.png',
            )
            .required(),
          name: yup.string().required(),
        })
        .typeError('Добавьте файл').required(),
    fileUrl: yup.string().nullable().typeError('Должно быть строкой'),
    description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    propertiesOfProduct: yup.array().of(
      yup
        .object()
        .shape({
          id: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
          propertyName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
          propertyType: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
          propertyValue: yup.lazy((value) => {
            switch (typeof value) {
              case 'number':
                return yup.number().typeError('Должно быть числом').required('Обязательное поле');
              case 'string':
                return yup.string().typeError('Должно быть строкой').required('Обязательное поле');
              default:
                return yup
                  .array()
                  .of(
                    yup.object().shape({
                      propertyValue: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
                    }),
                  )
                  .required('Обязательное поле');
            }
          }),
        })
        .required('Обязательное поле'),
    ),
  });

  const getFileSchema = (file) =>
    file && {
      file: file,
      type: file.type,
      name: file.name,
    };

  const fileHandleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else setImage(null);
  };

  const getArrErrorsMessages = (errors) => {
    const result = [];
    errors &&
      Array.isArray(errors) &&
      errors.forEach((value) => {
        if (typeof value === 'string') {
          result.push(value);
        } else {
          Object.values(value).forEach((error) => {
            result.push(error);
          });
        }
      });
    return result;
  };

  const getError = useCallback((touched, error, index) => {
    return touched && error && <FormHelperText key={index}>{error}</FormHelperText>;
  }, [])

  const formik = useFormik({
    initialValues: {
      itemName: editingProduct.itemName,
      // для контролируемого input необходимо задать изначально пустую строку либо определенное значение
      price: itemId ? editingProduct.price : '',
      file: undefined,
      fileUrl: editingProduct.fileUrl,
      dateOfChange: '',
      description: editingProduct.description,
      // Если это редактируемый товар, и у него есть свойства, то сюда передается их массив, иначе создается пустой массив
      propertiesOfProduct: itemId && editingProduct.propertiesOfProduct ? editingProduct.propertiesOfProduct : [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      productsSpinnerOpen();
      const { itemName, description, price, propertiesOfProduct } = values;
      const trimmedItemName = itemName.trim();
      const trimmedDescription = description.trim();
      const numberedPrice = parseInt(String(price).replace(/ /g, ''));

      const trimmedPropsOfProduct = propertiesOfProduct.map((props) => {
        if (typeof props.propertyValue === 'string') {
          return { ...props, propertyValue: props.propertyValue.trim() };
        } else if (Array.isArray(props.propertyValue)) {
          return {
            ...props,
            propertyValue: props.propertyValue.map((propValue) => {
              return {
                ...propValue,
                propertyValue: propValue.propertyValue.trim(),
              };
            }),
          };
        } else return props;
      });

      if (image) {
        // добавление случайного шестизначного числа к названию файла, для того что бы файлы с одинаковыми именами
        // не перезаписывали друг друга
        const fileNameWithRndNumber = `${image.name}_${Math.floor(Math.random() * 1000000)}`;
        const uploadTask = storage.ref(`images/${fileNameWithRndNumber}`).put(image);
        await uploadTask.on(
          'state_changed',
          (snapshot) => { },
          (error) => {
            productsError(error);
          },
          () => {
            storage
              .ref('images')
              .child(fileNameWithRndNumber)
              .getDownloadURL()
              .then((url) => {
                const newValues = {
                  ...values,
                  itemName: trimmedItemName,
                  description: trimmedDescription,
                  price: numberedPrice,
                  propertiesOfProduct: trimmedPropsOfProduct,
                  file: [], // чистим массив с фото, т.к. он не нужен в
                  // realtime firebase, файл загружается в firebase storage
                  fileUrl: url,
                };

                // Сработает, если товар редактируется
                if (itemId) {
                  putItemsToDatabase(
                    { ...newValues, dateOfChange: getDateOfChange() },
                    itemId,
                    'products',
                    productsError,
                    productsSpinnerClose,
                    editedProduct,
                  );
                } else {
                  postItemsToDatabase(
                    { ...newValues, dateOfChange: getDateOfChange() },
                    'products',
                    productsError,
                    productsSpinnerClose,
                    createdProduct,
                  );
                }
              });
          },
        );
      }
      // Сработает, если товар редактируется, но при этом изображение не было изменено (не было перевыбрано).
      else {
        const newValues = {
          ...values,
          itemName: trimmedItemName,
          description: trimmedDescription,
          price: numberedPrice,
          propertiesOfProduct: trimmedPropsOfProduct,
          file: [], // чистим массив с фото, т.к. он не нужен в
          // realtime firebase, файл загружается в firebase storage
        };

        await putItemsToDatabase(
          { ...newValues, dateOfChange: getDateOfChange() },
          itemId,
          'products',
          productsError,
          productsSpinnerClose,
          editedProduct,
        );
      }
    },
    validateOnBlur: true,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    dirty,
    setFieldTouched,
    setFieldValue,
  } = formik;

  const itemProperties = useMemo(() => {
    return itemId ? createUniqueProperties(properties, editingProduct.propertiesOfProduct) : properties
  }, [itemId, properties, editingProduct])

  return (
    <>
      {/*для того чтобы работал arrayHelper в инпуте type file*/}
      <div className={'add-item'}>
        <div className={'add-item-bordered-wrap'}>
          <form onSubmit={handleSubmit} className={'add-item-wrap'}>
            <div className={'buttons-wrap'}>
              <Link to={'/'} className={'button-back'} onClick={clearSelectedProduct}>
                Вернуться
              </Link>
              <Button
                disableRipple={true}
                className={'button-save'}
                classes={{
                  root: classesSaveBtn.root,
                  label: classesSaveBtn.label,
                }}
                type={'submit'}
                disabled={!isValid || !dirty}
                onClick={handleSubmit}
              >
                Сохранить
              </Button>
            </div>
            <div className={'add-item-head'}>
              <h5>{itemId ? 'Редактирование товара' : 'Добавление товара'}</h5>
            </div>
            <div className={'add-item-body'}>
              <FormControl error={Boolean(touched.itemName && errors.itemName)}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Название товара<span className={'red-star'}>*</span>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  variant="outlined"
                  notched={false}
                  placeholder="Название товара"
                  multiline
                  classes={{
                    root: classesInput.root,
                    input: classesInput.input,
                  }}
                  name={'itemName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.itemName}
                />
                {getError(touched.itemName, errors.itemName)}
              </FormControl>

              <FormControl error={Boolean(touched.price && errors.price)}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Стоимость товара<span className={'red-star'}>*</span>
                </FormLabel>
                <NumberFormat
                  classesInput={classesInput}
                  onChange={handleChange} // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
                  onBlur={handleBlur} // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
                  values={values}
                  customInput={PriceFormatInput}
                  format={priceFormat}
                />
                {getError(touched.price, errors.price)}
              </FormControl>

              <FormControl error={Boolean(touched.file && errors.file)}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Изображение<span className={'red-star'}>*</span>
                </FormLabel>
                <div>
                  <input
                    accept=".jpg,.jpeg,.png"
                    className={'upload-input'}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name={'file'}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const { files } = event.target;
                      const file = getFileSchema(files.item(0));
                      fileHandleChange(event);
                      values.fileUrl = null; // при выборе картинки обнуляю ссылку на неё
                      if (!file) {
                        setFieldValue('file', undefined, true)
                        values.fileUrl = editingProduct.fileUrl; // если отменил выбор картинки (нажал кнопку "отмена"),
                        // ссылу на изображение беру из редактируемого товара
                      } else {
                        setFieldValue('file', file, true)
                      }
                    }}
                  />
                  <label className={'upload-bnt-label'} htmlFor="contained-button-file">
                    <ThemeProvider theme={themeUploadBtn}>
                      <Button
                        variant="contained"
                        component="span"
                        disableRipple={true}
                        classes={{
                          root: classesUploadBtn.root,
                          label: classesUploadBtn.label,
                        }}
                        endIcon={<i className="fa fa-upload" aria-hidden="true" />}
                      >
                        {values.file === undefined || values.file === null ? (
                          <div className={'upload-btn-name'}>Выберите изображение</div>
                        ) : (
                          values.file.file.name
                        )}
                      </Button>
                    </ThemeProvider>
                  </label>
                </div>

              </FormControl>
              {/*Если редактируем товар, то загружаем его картинку сразу, но при выборе другой картинки
                используем мимниатюру Thumb*/}
              {values.fileUrl ? (
                <img src={values.fileUrl} alt={'изображение товара'} className={'thumb svg-thumbnail mt-2'} />
              ) : (
                <Thumb file={values.file === undefined || values.file === null ? null : values.file.file} />
              )}
              <FormControl error={Boolean(touched.description && errors.description)}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Описание<span className={'red-star'}>*</span>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  multiline={true}
                  rows={5}
                  inputProps={{ maxLength: 1000 }}
                  variant="outlined"
                  notched={false}
                  placeholder="Описание товара не должно превышать 1000 символов"
                  className={'add-item-textarea'}
                  classes={{
                    root: classesTextarea.root,
                  }}
                  name={'description'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {getError(touched.description, errors.description)}
              </FormControl>
            </div>
            <AddPropertyToProduct
              handleChange={handleChange}
              touched={touched.propertiesOfProduct}
              errors={errors.propertiesOfProduct}
              handleBlur={handleBlur}
              propertiesOfProduct={values.propertiesOfProduct}
              // properties={itemProperties}
              getError={getError}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(AddItem);
