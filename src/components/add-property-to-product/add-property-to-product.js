import React, {useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useAddItemSelectStyles from "../../styles/customizing-material-ui-components/add-item-select-style";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useAddPropertyButtonStyles from "../../styles/customizing-material-ui-components/button-add-property-style";
import useAddPropInputStyles from "../../styles/customizing-material-ui-components/add-prop-input-style";

import './add-property-to-product.scss';
import {FieldArray} from "formik";

const AddPropertyToProduct = ({handleChange, touched, errors, handleBlur, values, properties, getError}) => {

    const classesSelect = useAddItemSelectStyles();
    const classesButton = useAddPropertyButtonStyles();
    const classesInput = useAddPropInputStyles();

    const {propertiesOfProduct} = values;
    const [lastProperties, setLastProperties] = useState(properties);

    const removeSelectedProperties = (event) => {
        handleChange(event);
        const {value} = event.target;
        const lastProps = lastProperties.filter(item => item.propertyName !== value);
        setLastProperties(lastProps);
    }

    const pushSelectedProperties = (property) => {
        if (property) {
            const selectedProperty = properties.find(({propertyName}) => propertyName === property);
            lastProperties.push(selectedProperty);
        }
        return null;
    }

    const selectedWithLastProperties = (propName) => {
        const selectedProperty = properties.find(({propertyName}) => propertyName === propName);
        const arr = lastProperties.slice();
        arr.push(selectedProperty);
        return arr.map(renderMenuItems);
    }

    const renderMenuItems = (item) => {
        const {propertyName} = item;
        return (
            <MenuItem value={propertyName}>{propertyName}</MenuItem>
        )
    };

    const renderValueInputs = (selectedProp, index) => {
        const selectedProperty = properties.find(({propertyName}) => propertyName === selectedProp.propertyName);
        selectedProp.propertyType = selectedProperty.propertyType;              // записываю тип свойства в propertiesOfProduct[index].propertyType товара
        selectedProp.id = selectedProperty.id;                                  //записываю id свойства в propertiesOfProduct[index].id товара

        const nameOfFieldArray = `propertiesOfProduct.${index}.propertyValue`;
        switch (selectedProperty.propertyType) {
            case 'Dropdown':
                return (
                    <FieldArray name={`${nameOfFieldArray}`}>
                        {({remove, push}) => (
                            <div className={'add-property-right-column'}>
                                <p className={'property-name'}>Значение</p>
                                {selectedProp.propertyValue.length > 0 && selectedProp.propertyValue.map((selectedPropValue, idx) => (
                                    <div className={'input-with-remove-button'} key={idx}>
                                        <FormControl error={
                                            touched.propertiesOfProduct && touched.propertiesOfProduct[index] &&
                                            errors.propertiesOfProduct && errors.propertiesOfProduct[index] &&
                                            touched.propertiesOfProduct[index].propertyValue &&
                                            errors.propertiesOfProduct[index].propertyValue &&
                                            touched.propertiesOfProduct[index].propertyValue[idx] &&
                                            errors.propertiesOfProduct[index].propertyValue[idx]
                                                ? touched.propertiesOfProduct[index].propertyValue[idx].propertyValue
                                                && errors.propertiesOfProduct[index].propertyValue[idx].propertyValue : null}>
                                            <OutlinedInput type="text"
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
                                                           value={propertiesOfProduct[index].propertyValue[idx].propertyValue}>
                                            </OutlinedInput>
                                            {
                                                touched.propertiesOfProduct && touched.propertiesOfProduct[index] &&
                                                errors.propertiesOfProduct && errors.propertiesOfProduct[index] &&
                                                touched.propertiesOfProduct[index].propertyValue &&
                                                errors.propertiesOfProduct[index].propertyValue &&
                                                touched.propertiesOfProduct[index].propertyValue[idx] &&
                                                errors.propertiesOfProduct[index].propertyValue[idx]
                                                    ? getError(touched.propertiesOfProduct[index].propertyValue[idx].propertyValue,
                                                    errors.propertiesOfProduct[index].propertyValue[idx].propertyValue) : null
                                            }
                                        </FormControl>
                                        <IconButton classes={{root: classesButton.root}}
                                                    onClick={() => remove(idx)}>
                                            <RemoveCircleOutlineIcon/>
                                        </IconButton>
                                    </div>
                                ))}
                                <div className={'right-column-add-button'}>
                                    <IconButton classes={{root: classesButton.root}}
                                                onClick={() => push({propertyValue: ''})}>
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )}
                    </FieldArray>
                );
            case 'Number':
                return (
                    <div className={'add-property-right-column'}>
                        <p className={'property-name'}>Значение</p>
                        <FormControl
                            error={touched.propertiesOfProduct && touched.propertiesOfProduct[index]
                            && errors.propertiesOfProduct && errors.propertiesOfProduct[index]
                                ? touched.propertiesOfProduct[index].propertyValue && errors.propertiesOfProduct[index].propertyValue : null}>
                            <OutlinedInput type="number"
                                           variant="outlined"
                                           notched={false}
                                           classes={{
                                               root: classesInput.root,
                                               input: classesInput.input,
                                           }}
                                           name={`${nameOfFieldArray}`}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={propertiesOfProduct[index].propertyValue}>
                            </OutlinedInput>
                            {touched.propertiesOfProduct && touched.propertiesOfProduct[index]
                            && errors.propertiesOfProduct && errors.propertiesOfProduct[index]
                                ? getError(touched.propertiesOfProduct[index].propertyValue, errors.propertiesOfProduct[index].propertyValue) : null}
                        </FormControl>
                    </div>
                );
            case 'String':
                return (
                    <div className={'add-property-right-column'}>
                        <p className={'property-name'}>Значение</p>
                        <FormControl
                            error={touched.propertiesOfProduct && touched.propertiesOfProduct[index]
                            && errors.propertiesOfProduct && errors.propertiesOfProduct[index]
                                ? touched.propertiesOfProduct[index].propertyValue && errors.propertiesOfProduct[index].propertyValue : null}>
                            <OutlinedInput type="text"
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
                                           value={propertiesOfProduct[index].propertyValue}>
                            </OutlinedInput>
                            {touched.propertiesOfProduct && touched.propertiesOfProduct[index]
                            && errors.propertiesOfProduct && errors.propertiesOfProduct[index]
                                ? getError(touched.propertiesOfProduct[index].propertyValue, errors.propertiesOfProduct[index].propertyValue) : null}
                        </FormControl>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <FieldArray name={'propertiesOfProduct'}>
            {({remove, push}) => (
                <div className={'add-property-to-product'}>
                    <div className={'add-property-head'}>
                        <h5>Добавление товару свойств</h5>
                        {/*отключаем кнопку добавления свойств, когда кол-во свойств в товаре равно количеству достпуных
                        свойств*/}
                        {properties.length > propertiesOfProduct.length &&
                        <IconButton classes={{root: classesButton.root}}
                                    onClick={() => push({
                                        id: '',
                                        propertyName: '',
                                        propertyValue: '',
                                        propertyType: '',
                                    })}>
                            <AddCircleOutlineIcon/>
                        </IconButton>}
                    </div>
                    <div className={'add-property-body'}>
                        {propertiesOfProduct.map((propertyOfProduct, index) => (
                            <div className="add-property-body-element" key={index}>
                                <div className={'add-prop-left-column'}>
                                    <div className={'add-prop-row'}>
                                        <div className={'add-prop-left-button-wrap'}>
                                            <IconButton classes={{root: classesButton.root}}
                                                        onClick={() => {
                                                            pushSelectedProperties(propertiesOfProduct[index].propertyName);
                                                            remove(index)
                                                        }}>
                                                <RemoveCircleOutlineIcon/>
                                            </IconButton>
                                        </div>
                                        <p className={'property-name'}>Свойство {index + 1}</p>
                                    </div>
                                    <FormControl variant="outlined" className={classesSelect.formControl}
                                                 classes={{label: classesSelect.label}}>
                                        <Select
                                            classes={{
                                                root: classesSelect.root,
                                                icon: classesSelect.icon
                                            }}
                                            name={`propertiesOfProduct.${index}.propertyName`}
                                            value={propertiesOfProduct[index].propertyName}
                                            onChange={(event) => {
                                                removeSelectedProperties(event);
                                            }}
                                            onBlur={handleBlur}
                                            notched={false}>
                                            {propertiesOfProduct[index].propertyName ?
                                                selectedWithLastProperties(propertiesOfProduct[index].propertyName) :
                                                lastProperties.map(renderMenuItems)}
                                        </Select>
                                    </FormControl>
                                </div>
                                {propertiesOfProduct[index].propertyName &&
                                renderValueInputs(propertiesOfProduct[index], index)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </FieldArray>
    )
}

export default AddPropertyToProduct;