import React, { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { FieldArray } from 'formik';
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
    propertyName: '',
    propertyType: '',
    propertyValue: ['']
  }
}

/**
 * 
 * 
 */

const AddPropertyToProduct = memo((props) => {

  const { setFieldValue, propertiesOfProduct, error, setFieldTouched, handleChange } = props

  const addItems = useCallback(() => {
    const newItem = createSchema()
    if (Array.isArray(propertiesOfProduct)) {
      setFieldValue('propertiesOfProduct', [...propertiesOfProduct, newItem])
    } else {
      setFieldValue('propertiesOfProduct', [newItem])
    }
  }, [setFieldValue, propertiesOfProduct])

  const removeItem = useCallback((id) => {
    const newValue = propertiesOfProduct.filter((_, index) => index !== id)
    setFieldValue('propertiesOfProduct', newValue)
  }, [setFieldValue, propertiesOfProduct])

  const setPropertyType = useCallback((id, value) => {
    setFieldValue(`propertiesOfProduct[${id}]propertyType`, value)
  }, [setFieldValue])

  const removeField = useCallback((parentId, id) => {
    const newValues = propertiesOfProduct[parentId].propertyValue.filter((_, index) => index !== id)
    setFieldValue(`propertiesOfProduct[${parentId}]propertyValue`, newValues)
  }, [setFieldValue, propertiesOfProduct])

  const addField = useCallback((parentId) => {
    const arrValue = propertiesOfProduct[parentId].propertyValue;
    if (Array.isArray(arrValue)) {
      setFieldValue(`propertiesOfProduct[${parentId}]propertyValue`, [...arrValue, ''])
    } else {
      setFieldValue(`propertiesOfProduct[${parentId}]propertyValue`, [''])
    }
  }, [setFieldValue, propertiesOfProduct])

  return (
    <div>
      <button onClick={addItems}>Добавить свойство товара</button>
      {Array.isArray(propertiesOfProduct) && (propertiesOfProduct).map((item, parentId) => {
        const { propertyValue, propertyName } = item
        return (
          <div key={parentId}>
            <ProperySelect id={parentId} removeItem={removeItem} setPropertyType={setPropertyType} addField={addField}>
              {Array.isArray(propertyValue) && propertyValue.map((value, id, arr) => {
                return <PropertyValueInput
                  key={`${parentId}-${id}`}
                  value={value}
                  parentId={parentId}
                  id={id}
                  handleChange={handleChange}
                  removeField={removeField}
                  canDelete={arr.length > 1}
                />
              })}

            </ProperySelect>

          </div>
        )
      })}
    </div>
  )

})

const PropertyValueInput = (props) => {
  const { value, parentId, id, handleChange, removeField, canDelete } = props

  const name = useMemo(() => {
    return `propertiesOfProduct[${parentId}]propertyValue[${id}]`
  }, [id, parentId])

  const onRemove = useCallback(() => {
    removeField(parentId, id)
  }, [removeField, parentId, id])

  return <p>
    <input name={name} value={value} onChange={handleChange} />
    {canDelete && <button onClick={onRemove}>удалить</button>}

  </p>
}

const ProperySelect = (props) => {
  const {
    children,
    propertyName,
    propertyType,
    id,
    removeItem,
    // change select
    setPropertyType,
    addField
  } = props

  const onRemove = useCallback(() => {
    removeItem(id)
  }, [id, removeItem])

  const onSelectChange = useCallback((e) => {
    const { value } = e.target
    setPropertyType(id, value)
  }, [id, setPropertyType])

  const onAdd = useCallback(() => {
    addField(id)
  }, [id, addField])

  // Return select
  return <div>
    <div>{propertyName} <br />  {propertyType}</div>
    <button onClick={onRemove}>удалить</button>
    <select onChange={onSelectChange}>
      <option value="dropdown">Цвет авто</option>
      <option value="Nuber">Год выпуска</option>
      <option value="String">Тип топлива</option>
    </select>
    {children}
    <button onClick={onAdd}>добавить</button>
  </div>
}

export { AddPropertyToProduct };
