import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import {
  theme,
  useLoginButtonStyles,
  useProductCardItemSelectStyles,
} from '../../styles/customizing-material-ui-components';

import './product-card.scss';

const ProductCard = ({ selectedProduct, clearSelectedProduct, logIn }) => {
  const classes = useLoginButtonStyles();
  const classesSelect = useProductCardItemSelectStyles();

  const { itemName, fileUrl, description, price, propertiesOfProduct } =
    selectedProduct;

  const validationSchema = yup.object().shape({
    itemName: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    description: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    fileUrl: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    price: yup
      .number()
      .typeError('Должно быть числом')
      .integer('Должно быть целым числом')
      .required('Обязательное поле'),
    propertiesOfProduct: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        propertyName: yup.string(),
        propertyType: yup.string(),
        propertyValue: yup.string(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      itemName: itemName,
      description: description,
      fileUrl: fileUrl,
      price: price,
      propertiesOfProduct: propertiesOfProduct ? propertiesOfProduct : [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      console.log(values);
    },
    validateOnBlur: true,
  });

  const {
    values,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    setFieldValue,
  } = formik;

  // При первом реднере компоненты, прохожу по массиву свойств товара и в случае, когда свойство имеет тип Dropdown,
  // его первое значение из массива значений сразу устанавливаю в initialValues формика, т.к. если пользователь не выберет
  // вручную какое либо свойство из селекта (т.е. не сработает onChange селекта), то в initialValues передастся весь
  // массив значений свойств Dropdown, а не только одно значение.
  const setFirstValuesFromDropDowns = useCallback(
    (property, index) => {
      if (property.propertyType === 'Dropdown') {
        return setFieldValue(
          `propertiesOfProduct.${index}.propertyValue`,
          propertiesOfProduct[index].propertyValue[0].propertyValue,
          false
        );
      }
    },
    [propertiesOfProduct, setFieldValue]
  );

  useEffect(() => {
    if (propertiesOfProduct) {
      propertiesOfProduct.map(setFirstValuesFromDropDowns);
    }
  }, [propertiesOfProduct, setFirstValuesFromDropDowns]);

  const renderMenuItems = (item, index) => {
    const { propertyValue } = item;
    return (
      <MenuItem value={propertyValue} key={index}>
        {propertyValue}
      </MenuItem>
    );
  };

  const renderPropertiesOfProduct = (property, index) => {
    const { propertyName, propertyType, propertyValue } = property;
    switch (propertyType) {
      case 'Dropdown':
        return (
          <div key={index}>
            <h4>{propertyName}</h4>
            <FormControl
              variant="outlined"
              className={classesSelect.formControl}
            >
              <Select
                classes={{
                  root: classesSelect.root,
                  icon: classesSelect.icon,
                }}
                name={`propertiesOfProduct.${index}.propertyValue`}
                onChange={handleChange}
                onBlur={handleBlur}
                /*Если true, на контуре сделана выемка для размещения имени селекта.*/
                notched={false}
                /*В данном случае будет первое значение из массива свойств Dropdown, т.к. при рендере
                                этому полю было присвоено первое значение свойства из массива значений.
                                Условие же необходимо, т.к. "values.propertiesOfProduct[index].propertyValue" изначально массив значений,
                                а в селекте значением может быть простой элемекнт, а не массив, поэтому мы присваиваем пустую строку */
                value={
                  Array.isArray(values.propertiesOfProduct[index].propertyValue)
                    ? ''
                    : values.propertiesOfProduct[index].propertyValue
                }
              >
                {propertyValue.map(renderMenuItems)}
              </Select>
            </FormControl>
          </div>
        );
      case 'Number':
        return (
          <div key={index}>
            <h4>{propertyName}</h4>
            <p>{propertyValue}</p>
          </div>
        );
      case 'String':
        return (
          <div key={index}>
            <h4>{propertyName}</h4>
            <p>{propertyValue}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={'product-card'}>
      <div className={'product-card-bordered-wrap'}>
        <div className={'product-card-wrap'}>
          {logIn ? (
            <div className={'link'}>
              <Link to={'/'} onClick={clearSelectedProduct}>
                Вернуться
              </Link>
            </div>
          ) : null}
          <form onSubmit={handleSubmit} className={'product-card-wrapper'}>
            <div className={'header-items-row'}>
              <div className={'item-image'}>
                <img src={fileUrl} alt={'product'} />
              </div>
              <div className={'item-information'}>
                <h3>{itemName}</h3>
                <p>{description}</p>
              </div>
            </div>
            <div className={'bottom-items-row'}>
              <div className={'item-properties'}>
                {propertiesOfProduct &&
                  propertiesOfProduct.map(renderPropertiesOfProduct)}
                <h4>Стоимость</h4>
                <span className={'price'}>
                  {price.toLocaleString('ru-RU')}$
                </span>
              </div>
              <div className={'button-wrap'}>
                <ThemeProvider theme={theme}>
                  <Button
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    type={'submit'}
                    disabled={!isValid}
                    onClick={handleSubmit}
                  >
                    Беру!!!
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
