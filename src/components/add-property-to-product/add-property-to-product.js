import React from 'react';
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

    const renderMenuItems = (item) => {
        const {propertyName} = item;
        return (
            <MenuItem value={propertyName}>{propertyName}</MenuItem>
        )
    }

    const renderValueInputs = (selectedProp, index) => {
        const selectedProperty = properties.find(({propertyName}) => propertyName === selectedProp.propertyName);
        const selectedPropType = selectedProperty.propertyType;
        selectedProp.propertyType = selectedPropType;
        const nameOfFieldArray = `propertiesOfProduct.${index}.propertyValue`;
        switch (selectedPropType) {
            case 'Dropdown':
                return (
                    <FieldArray name={`${nameOfFieldArray}`}>
                        { ({remove, push}) => (
                            <div className={'add-property-right-column'}>
                                <p className={'property-name'}>Значение</p>
                                {selectedProp.propertyValue.length > 0 && selectedProp.propertyValue.map( (selectedPropValue, idx) => (
                                    <div className={'input-with-remove-button'} key={idx}>
                                        <FormControl error={touched.propertyValue && errors.propertyValue}>
                                            <OutlinedInput type="text"
                                                           variant="outlined"
                                                           notched={false}
                                                           multiline
                                                           classes={{
                                                               root: classesInput.root,
                                                               input: classesInput.input,
                                                           }}
                                                           name={`${nameOfFieldArray}.${idx}`}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           value={values.propertyValue}>
                                            </OutlinedInput>
                                            {getError(touched.propertyValue, errors.propertyValue)}
                                        </FormControl>
                                        <IconButton classes={{root: classesButton.root}}
                                        onClick={() => remove(idx)}>
                                            <RemoveCircleOutlineIcon/>
                                        </IconButton>
                                    </div>
                                ))}
                                <div className={'right-column-add-button'}>
                                    <IconButton classes={{root: classesButton.root}}
                                    onClick={() => push({propertyValue: ''})} >
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
                        <FormControl error={touched.propertyValue && errors.propertyValue}>
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
                            {getError(touched.propertyValue, errors.propertyValue)}
                        </FormControl>
                    </div>
                );
            case 'String':
                return (
                    <div className={'add-property-right-column'}>
                        <p className={'property-name'}>Значение</p>
                        <FormControl error={touched.propertyValue && errors.propertyValue}>
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
                                           value={values.propertyValue}>
                            </OutlinedInput>
                            {getError(touched.propertyValue, errors.propertyValue)}
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
                                    onClick={() => push({propertyName: '', propertyValue: '', propertyType: '', })}>
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
                                                        onClick={() => remove(index)}>
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            notched={false}>
                                            {properties.map(renderMenuItems)}
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