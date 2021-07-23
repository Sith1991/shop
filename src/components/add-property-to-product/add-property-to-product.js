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
  }) => {
    const classesSelect = useAddItemSelectStyles();
    const classesButton = useAddPropertyButtonStyles();
    const classesInput = useAddPropInputStyles();

    // Храним массив оставшихся свойств.
    const [lastProperties, setLastProperties] = useState(properties);

    // если товар редактируется, из свего массива свойств вычитаю массив свойств, которые уже есть у товара,
    // и переопределяю массив оставшихся свойств. В случае, если товар только добавляется, то результатом вычитания останется
    // изначальный массив свойств (полученный с сервера).
    // Вычитание произвожу по имени свойств (propertyName).
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
        // При перевыборе свойства, очищаю его значение (устанвливаю значение на пустую строку), что бы при выборе другого
        // свойства, ранее вбитые значения не присваивались ему автоматически
        setFieldValue(`propertiesOfProduct.${index}.propertyValue`, '', false);
        // При перевыборе свойства, очищаю параметр touched т.к. если этого не сделать, то сработавшие errors передадутся на
        // заново выбранное свойство
        setFieldTouched(`propertiesOfProduct.${index}.propertyValue`, false, false);
        // удаляю выбранное свойство из массива оставшихся свойств
        const { value } = event.target;
        const lastProps = lastProperties.filter((item) => item.propertyName !== value);
        setLastProperties(lastProps);
      },
      [handleChange, setFieldValue, setFieldTouched, lastProperties],
    );

    // если происходит удаление свойства у товара, то происходит поиск по имении удаляемого свойства в массиве всех свойств
    // и добавляется данное свойство (объект с этим свойством) в массив оставшихся свойств
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

    // в случае, когда в селекте выбрано свойство, делаю копию оставшихся свойств и добавляю его для дальнейшего
    // рендеринга итемов для селекта, иначе любое выбранное свойство удаляется из массива оставшихся свойств
    const selectedWithLastProperties = useCallback(
      (propName) => {
        const selectedProperty = properties.find(({ propertyName }) => propertyName === propName);
        // делаю копию массива оставшихся свойств
        const arr = lastProperties.slice();
        // пушу к этому массиву выбранное в селекте свойство
        arr.push(selectedProperty);
        // рендерю итемы для селекта свойств
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

    const errorConditionDropdown = useCallback((index, idx) => {
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
    }, [touched.propertiesOfProduct, errors.propertiesOfProduct]);

    const renderValueInputs = useCallback(
      (selectedProp, index) => {
        // нахожу по имени выбранное свойство из массива всех возможных свойств
        const selectedProperty = properties.find(({ propertyName }) => propertyName === selectedProp.propertyName);
        // присваиваю тип и id выбранного свойства в массив добавленных свойств данному товару
        selectedProp.propertyType = selectedProperty.propertyType; // записываю тип свойства в propertiesOfProduct[index].propertyType товара
        selectedProp.id = selectedProperty.id; //записываю id свойства в propertiesOfProduct[index].id товара

        const nameOfFieldArray = `propertiesOfProduct.${index}.propertyValue`;
        switch (selectedProperty.propertyType) {
          case 'Dropdown':
            return (
              <div className={'add-property-right-column'}>
                <p className={'property-name'}>Значение</p>
                {/*В случае если массив значений свойства DROPDOWN будет пустым, не выполнять мапинг*/}
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
                          onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
        errorConditionDropdown
      ],
    );

    return (
      <div className={'add-property-to-product'}>
        <div className={'add-property-head'}>
          <h5>Добавление товару свойств</h5>
          {/*отключаем кнопку добавления свойств, когда кол-во свойств в товаре равно количеству достпуных свойств*/}
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
                    notched={false} /*Если true, на контуре сделана выемка для размещения метки.*/
                  >
                    {/*если в селекте выбрано свойство, добавить его к оставшимся свойствам,
                      но только для рендеринга итемов для селекта,иначе просто отрендерить оставшиеся свойства*/}
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
