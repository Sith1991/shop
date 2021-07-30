import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormControl, FormLabel } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { Thumb } from '../../components/thumb';
import { PriceFormatInput } from '../../components/price-format-input';
import { getDateOfChange, postItemsToDatabase, putItemsToDatabase, storage } from '../../services';
import { AddPropertyToProduct } from '../../components/add-property-to-product';
import { addItemValidationSchema } from './add-item-validation-schema';
import { FormHelperTextStyled } from "../../components/form-helper-text";

import {
  themeUploadBtn,
  useAddItemInputStyles,
  useAddItemLabelStyles,
  useAddItemTextareaStyles,
  useSaveButtonStyles,
  useUploadButtonStyles,
} from '../../styles/customizing-material-ui-components';

import './add-item.scss';

const AddItem = memo(
  ({
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

    const priceFormat = useCallback((value) => {
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }, []);

    const createUniqueProperties = useCallback((allProperties, propertiesOfProduct) => {
      if (!propertiesOfProduct) {
        return allProperties;
      }
      const uniqueResultTwo = propertiesOfProduct.filter(function (obj) {
        return !allProperties.some(function (obj2) {
          return obj.id === obj2.id;
        });
      });

      return allProperties.concat(uniqueResultTwo);
    }, []);

    const itemProperties = useMemo(() => {
      return itemId ? createUniqueProperties(properties, editingProduct.propertiesOfProduct) : properties;
    }, [itemId, properties, editingProduct, createUniqueProperties]);

    const getFileSchema = useCallback(
      (file) =>
        file && {
          file: file,
          type: file.type,
          name: file.name,
        },
      [],
    );

    const fileHandleChange = useCallback((e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      } else setImage(null);
    }, []);

    const getError = useCallback((touched, error, index) => {
      return touched && error && <FormHelperTextStyled key={index}>{error}</FormHelperTextStyled>;
    }, []);

    const formik = useFormik({
      initialValues: {
        itemId: Boolean(itemId),
        itemName: editingProduct.itemName,
        price: itemId ? editingProduct.price : '',
        file: undefined,
        fileUrl: editingProduct.fileUrl,
        dateOfChange: '',
        description: editingProduct.description,
        propertiesOfProduct: itemId && editingProduct.propertiesOfProduct ? editingProduct.propertiesOfProduct : [],
      },
      validationSchema: addItemValidationSchema,
      onSubmit: async (values) => {
        productsSpinnerOpen();
        const { price } = values;
        const numberedPrice = parseInt(String(price).replace(/ /g, ''));

        if (image) {
          const fileNameWithRndNumber = `${image.name}_${Math.floor(Math.random() * 1000000)}`;
          const uploadTask = storage.ref(`images/${fileNameWithRndNumber}`).put(image);
          await uploadTask.on(
            'state_changed',
            (snapshot) => {},
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
                    price: numberedPrice,
                    file: [],
                    fileUrl: url,
                  };

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
        else {
          const newValues = {
            ...values,
            price: numberedPrice,
            file: [],
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
      values: { itemName, price, file, fileUrl, description, propertiesOfProduct },
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

    const handleTrim = useCallback(
      (event, trimValue) => {
        handleBlur(event);
        const newValue = event.target.value.trim();
        setFieldValue(trimValue, newValue, true);
      },
      [handleBlur, setFieldValue],
    );

    return (
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
                  onBlur={(event) => handleTrim(event, 'itemName')}
                  value={itemName}
                />
                {getError(touched.itemName, errors.itemName)}
              </FormControl>

              <FormControl error={Boolean(touched.price && errors.price)}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Стоимость товара<span className={'red-star'}>*</span>
                </FormLabel>
                <NumberFormat
                  classesInput={classesInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={price}
                  customInput={PriceFormatInput}
                  format={priceFormat}
                />
                {getError(touched.price, errors.price)}
              </FormControl>
              <FormControl error={Boolean(touched.file && errors.file)} className={'upload-bnt-wrap'}>
                <FormLabel classes={{ root: classesLabel.root }} className={'labels'}>
                  Изображение<span className={'red-star'}>*</span>
                </FormLabel>
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
                    setFieldTouched('file', true, true);
                    fileHandleChange(event);
                    values.fileUrl = null; // при выборе картинки обнуляю ссылку на неё
                    if (!file) {
                      setFieldValue('file', undefined, true);
                      values.fileUrl = editingProduct.fileUrl;
                    } else {
                      setFieldValue('file', file, true);
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
                      {file === undefined || file === null ? (
                        <div className={'upload-btn-name'}>Выберите изображение</div>
                      ) : (
                        file.file.name
                      )}
                    </Button>
                  </ThemeProvider>
                </label>
                {getError(touched.file, errors.file?.file)}
              </FormControl>
              <div className={'thumb-wrapper img-thumbnail'}>
                {fileUrl ? (
                  <img src={fileUrl} alt={'изображение товара'} className={'thumb'} />
                ) : (
                  <Thumb file={file === undefined || file === null ? null : file.file} />
                )}
              </div>
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
                  onBlur={(event) => handleTrim(event, 'description')}
                  value={description}
                />
                {getError(touched.description, errors.description)}
              </FormControl>
            </div>
            <AddPropertyToProduct
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              handleBlur={handleBlur}
              propertiesOfProduct={propertiesOfProduct}
              properties={itemProperties}
              getError={getError}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              handleTrim={handleTrim}
            />
          </form>
        </div>
      </div>
    );
  },
);

export default withRouter(AddItem);
