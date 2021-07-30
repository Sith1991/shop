import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { useLoginButtonStyles, useProductCardItemSelectStyles } from '../../styles/customizing-material-ui-components';
import { productCardValidationSchema } from './product-card-validation-shema';

import './product-card.scss';

const ProductCard = ({ selectedProduct, clearSelectedProduct, logIn }) => {
  const classes = useLoginButtonStyles();
  const classesSelect = useProductCardItemSelectStyles();

  const { itemName, fileUrl, description, price, propertiesOfProduct } = selectedProduct;

  const formik = useFormik({
    initialValues: {
      itemName: itemName,
      description: description,
      fileUrl: fileUrl,
      price: price,
      propertiesOfProduct: propertiesOfProduct ? propertiesOfProduct : [],
    },
    validationSchema: productCardValidationSchema,
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      console.log(values);
    },
    validateOnBlur: true,
  });

  const { values, handleChange, handleBlur, isValid, handleSubmit, setFieldValue } = formik;

  const setFirstValuesFromDropDowns = useCallback(
    (property, index) => {
      if (property.propertyType === 'Dropdown') {
        return setFieldValue(
          `propertiesOfProduct.${index}.propertyValue`,
          propertiesOfProduct[index].propertyValue[0].propertyValue,
          false,
        );
      }
    },
    [propertiesOfProduct, setFieldValue],
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
            <FormControl variant="outlined" className={classesSelect.formControl}>
              <Select
                classes={{
                  root: classesSelect.root,
                  icon: classesSelect.icon,
                }}
                name={`propertiesOfProduct.${index}.propertyValue`}
                onChange={handleChange}
                onBlur={handleBlur}
                notched={false}
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
                {propertiesOfProduct && propertiesOfProduct.map(renderPropertiesOfProduct)}
                <h4>Стоимость</h4>
                <span className={'price'}>{price.toLocaleString('ru-RU')}$</span>
              </div>
              <div className={'button-wrap'}>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
