import React, { useCallback, useEffect, useState, memo } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import {
  useAddItemSelectStyles,
  useAddPropInputStyles,
  useAddPropertyButtonStyles,
} from '../../styles/customizing-material-ui-components';

import './add-property-to-product.scss';

const createSchema = () => {
  return {
    id: '',
    propertyName: '',
    propertyValue: '',
    propertyType: '',
  };
};

const AddPropertyToProduct = memo(
  ({
    handleChange,
    touched,
    errors,
    handleBlur,
    properties,
    getError,
    setFieldValue,
    setFieldTouched,
    propertiesOfProduct,
    handleTrim,
  }) => {
    const classesSelect = useAddItemSelectStyles();
    const classesButton = useAddPropertyButtonStyles();
    const classesInput = useAddPropInputStyles();

    const [lastProperties, setLastProperties] = useState(properties);

    const propertiesWithEditing = useCallback((properties, propertiesOfProduct) => {
      const result = properties.filter((x) => !propertiesOfProduct.some((y) => x.propertyName === y.propertyName));
      setLastProperties(result);
    }, []);

    useEffect(() => {
      propertiesWithEditing(properties, propertiesOfProduct);
    }, [propertiesWithEditing, properties, propertiesOfProduct]);

    const removeSelectedProperties = useCallback(
      (event, index) => {
        handleChange(event);
        setFieldValue(`propertiesOfProduct.${index}.propertyValue`, '', false);
        setFieldTouched(`propertiesOfProduct.${index}.propertyValue`, false, false);
        const { value } = event.target;
        const lastProps = lastProperties.filter((item) => item.propertyName !== value);
        setLastProperties(lastProps);
      },
      [handleChange, setFieldValue, setFieldTouched, lastProperties],
    );

    const pushSelectedProperties = useCallback(
      (property) => {
        if (property) {
          const selectedProperty = properties.find(({ propertyName }) => propertyName === property);
          lastProperties.push(selectedProperty);
        }
        return null;
      },
      [lastProperties, properties],
    );

    const renderMenuItems = useCallback((item, index) => {
      const { propertyName } = item;
      return (
        <MenuItem value={propertyName} key={index}>
          {propertyName}
        </MenuItem>
      );
    }, []);

    const selectedWithLastProperties = useCallback(
      (propName) => {
        const selectedProperty = properties.find(({ propertyName }) => propertyName === propName);
        const arr = lastProperties.slice();
        arr.push(selectedProperty);
        return arr.map(renderMenuItems);
      },
      [lastProperties, properties, renderMenuItems],
    );

    const addItems = useCallback(() => {
      const newItem = createSchema();
      if (Array.isArray(propertiesOfProduct)) {
        setFieldValue('propertiesOfProduct', [...propertiesOfProduct, newItem], true);
      } else {
        setFieldValue('propertiesOfProduct', [newItem], true);
      }
    }, [setFieldValue, propertiesOfProduct]);

    const removeItem = useCallback(
      (index) => {
        const newValue = propertiesOfProduct.filter((_, i) => i !== index);
        setFieldValue('propertiesOfProduct', newValue, true);
      },
      [setFieldValue, propertiesOfProduct],
    );

    const addValueToProps = useCallback(
      (nameOfFieldArray, selectedPropValue) => {
        const newItem = { propertyValue: '' };
        if (Array.isArray(selectedPropValue)) {
          setFieldValue(nameOfFieldArray, [...selectedPropValue, newItem], true);
        } else {
          setFieldValue(nameOfFieldArray, [newItem], true);
        }
      },
      [setFieldValue],
    );

    const removeValueFromProps = useCallback(
      (nameOfFieldArray, selectedPropValue, index) => {
        const newValue = selectedPropValue.filter((_, i) => i !== index);
        setFieldValue(nameOfFieldArray, newValue, true);
      },
      [setFieldValue],
    );

    const errorConditionDropdown = useCallback(
      (index, idx) => {
        return (
          touched.propertiesOfProduct &&
          touched.propertiesOfProduct[index] &&
          errors.propertiesOfProduct &&
          errors.propertiesOfProduct[index] &&
          touched.propertiesOfProduct[index].propertyValue &&
          errors.propertiesOfProduct[index].propertyValue &&
          touched.propertiesOfProduct[index].propertyValue[idx] &&
          errors.propertiesOfProduct[index].propertyValue[idx]
        );
      },
      [touched.propertiesOfProduct, errors.propertiesOfProduct],
    );

    const renderValueInputs = useCallback(
      (selectedProp, index) => {
        const selectedProperty = properties.find(({ propertyName }) => propertyName === selectedProp.propertyName);
        selectedProp.propertyType = selectedProperty.propertyType;
        selectedProp.id = selectedProperty.id;

        const nameOfFieldArray = `propertiesOfProduct.${index}.propertyValue`;
        switch (selectedProperty.propertyType) {
          case 'Dropdown':
            return (
              <div className={'add-property-right-column'}>
                <p className={'property-name'}>Значение</p>
                {selectedProp.propertyValue &&
                  selectedProp.propertyValue.length > 0 &&
                  selectedProp.propertyValue.map((selectedPropValue, idx) => (
                    <div className={'input-with-remove-button'} key={idx}>
                      <FormControl
                        error={
                          errorConditionDropdown(index, idx)
                            ? Boolean(
                                touched.propertiesOfProduct[index].propertyValue[idx].propertyValue &&
                                  errors.propertiesOfProduct[index].propertyValue[idx].propertyValue,
                              )
                            : null
                        }
                      >
                        <OutlinedInput
                          type="text"
                          variant="outlined"
                          notched={false}
                          multiline
                          classes={{
                            root: classesInput.root,
                            input: classesInput.input,
                          }}
                          name={`${nameOfFieldArray}.${idx}.propertyValue`}
                          onChange={handleChange}
                          onBlur={(event) =>
                            handleTrim(event, `propertiesOfProduct.${index}.propertyValue.${idx}.propertyValue`)
                          }
                          value={propertiesOfProduct[index].propertyValue[idx].propertyValue}
                        />
                        {errorConditionDropdown(index, idx)
                          ? getError(
                              touched.propertiesOfProduct[index].propertyValue[idx].propertyValue,
                              errors.propertiesOfProduct[index].propertyValue[idx].propertyValue,
                            )
                          : null}
                      </FormControl>
                      <IconButton
                        classes={{ root: classesButton.root }}
                        onClick={() => removeValueFromProps(nameOfFieldArray, selectedProp.propertyValue, idx)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </div>
                  ))}
                <div className={'right-column-add-button'}>
                  <IconButton
                    classes={{ root: classesButton.root }}
                    onClick={() => addValueToProps(nameOfFieldArray, selectedProp.propertyValue)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            );
          case 'Number':
            const errorConditionNumber =
              touched.propertiesOfProduct &&
              touched.propertiesOfProduct[index] &&
              errors.propertiesOfProduct &&
              errors.propertiesOfProduct[index];
            return (
              <div className={'add-property-right-column'}>
                <p className={'property-name'}>Значение</p>
                <FormControl
                  error={
                    errorConditionNumber
                      ? Boolean(
                          touched.propertiesOfProduct[index].propertyValue &&
                            errors.propertiesOfProduct[index].propertyValue,
                        )
                      : null
                  }
                >
                  <OutlinedInput
                    type="number"
                    variant="outlined"
                    notched={false}
                    classes={{
                      root: classesInput.root,
                      input: classesInput.input,
                    }}
                    name={`${nameOfFieldArray}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={propertiesOfProduct[index].propertyValue}
                  />
                  {errorConditionNumber
                    ? getError(
                        touched.propertiesOfProduct[index].propertyValue,
                        errors.propertiesOfProduct[index].propertyValue,
                      )
                    : null}
                </FormControl>
              </div>
            );
          case 'String':
            const errorConditionString =
              touched.propertiesOfProduct &&
              touched.propertiesOfProduct[index] &&
              errors.propertiesOfProduct &&
              errors.propertiesOfProduct[index];
            return (
              <div className={'add-property-right-column'}>
                <p className={'property-name'}>Значение</p>
                <FormControl
                  error={
                    errorConditionString
                      ? Boolean(
                          touched.propertiesOfProduct[index].propertyValue &&
                            errors.propertiesOfProduct[index].propertyValue,
                        )
                      : null
                  }
                >
                  <OutlinedInput
                    type="text"
                    variant="outlined"
                    notched={false}
                    multiline
                    classes={{
                      root: classesInput.root,
                      input: classesInput.input,
                    }}
                    name={`${nameOfFieldArray}`}
                    onChange={handleChange}
                    onBlur={(event) => handleTrim(event, `propertiesOfProduct.${index}.propertyValue`)}
                    value={propertiesOfProduct[index].propertyValue}
                  />
                  {errorConditionString
                    ? getError(
                        touched.propertiesOfProduct[index].propertyValue,
                        errors.propertiesOfProduct[index].propertyValue,
                      )
                    : null}
                </FormControl>
              </div>
            );
          default:
            return null;
        }
      },
      [
        addValueToProps,
        classesButton.root,
        classesInput.input,
        classesInput.root,
        errors.propertiesOfProduct,
        getError,
        handleBlur,
        handleChange,
        properties,
        propertiesOfProduct,
        removeValueFromProps,
        touched.propertiesOfProduct,
        errorConditionDropdown,
        handleTrim,
      ],
    );

    return (
      <div className={'add-property-to-product'}>
        <div className={'add-property-head'}>
          <h5>Добавление товару свойств</h5>
          {properties.length > propertiesOfProduct.length && (
            <IconButton
              classes={{ root: classesButton.root }}
              onClick={() => {
                addItems();
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </div>
        <div className={'add-property-body'}>
          {propertiesOfProduct.map((propertyOfProduct, index) => (
            <div className="add-property-body-element" key={index}>
              <div className={'add-prop-left-column'}>
                <div className={'add-prop-row'}>
                  <div className={'add-prop-left-button-wrap'}>
                    <IconButton
                      classes={{ root: classesButton.root }}
                      onClick={() => {
                        pushSelectedProperties(propertiesOfProduct[index].propertyName);
                        /* remove(index);*/
                        removeItem(index);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </div>
                  <p className={'property-name'}>Свойство {index + 1}</p>
                </div>
                <FormControl
                  variant="outlined"
                  className={classesSelect.formControl}
                  classes={{ label: classesSelect.label }}
                >
                  <Select
                    classes={{
                      root: classesSelect.root,
                      icon: classesSelect.icon,
                    }}
                    name={`propertiesOfProduct.${index}.propertyName`}
                    value={propertiesOfProduct[index].propertyName}
                    onChange={(event) => {
                      removeSelectedProperties(event, index);
                    }}
                    onBlur={handleBlur}
                    notched={false}
                  >
                    {propertiesOfProduct[index].propertyName
                      ? selectedWithLastProperties(propertiesOfProduct[index].propertyName)
                      : lastProperties.map(renderMenuItems)}
                  </Select>
                </FormControl>
              </div>
              {propertiesOfProduct[index].propertyName && renderValueInputs(propertiesOfProduct[index], index)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export { AddPropertyToProduct };
