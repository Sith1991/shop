import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './add-property-to-product.scss';
import useAddItemSelectStyles from "../../styles/customizing-material-ui-components/add-item-select-style";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useAddPropertyButtonStyles from "../../styles/customizing-material-ui-components/button-add-property-style";
import useAddPropInputStyles from "../../styles/customizing-material-ui-components/add-prop-input-style";



const AddPropertyToProduct = ({handleChange, touched, errors, handleBlur, values, getError}) => {

    const classesSelect = useAddItemSelectStyles();
    const classesButton = useAddPropertyButtonStyles();
    const classesInput = useAddPropInputStyles();


    return (
            <div className={'add-property-to-product'}>
                <div className={'add-property-head'}>
                    <h5>Добавление товару свойств</h5>
                    <IconButton classes={{root: classesButton.root}}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div className={'add-property-body'}>
                    <div className={'add-prop-left-column'}>
                        <div className={'add-prop-row'}>
                            <div className={'add-prop-left-button-wrap'}>
                                <IconButton classes={{root: classesButton.root}}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </div>
                            <p className={'property-name'}>Свойство 1</p>
                        </div>
                        <FormControl variant="outlined" className={classesSelect.formControl} classes={{label:classesSelect.label}} >

                            <Select
                                classes={{root:classesSelect.root,
                                    icon:classesSelect.icon}}
                                name={'propertyName'}
                                value={values.propertyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                notched={false}
                            >
                                <MenuItem value={'Цвет авто'}>Цвет авто</MenuItem>
                                <MenuItem value={'Год выпуска'}>Год выпуска</MenuItem>
                                <MenuItem value={'Тип топлива'}>Тип топлива</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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
                                           name={'propertyValue'}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.propertyValue}>
                            </OutlinedInput>
                            {getError(touched.propertyValue, errors.propertyValue)}
                        </FormControl>
                        <div className={'input-with-remove-button'}>
                            <FormControl error={touched.propertyValue && errors.propertyValue}>
                                <OutlinedInput type="text"
                                               variant="outlined"
                                               notched={false}
                                               multiline
                                               classes={{
                                                   root: classesInput.root,
                                                   input: classesInput.input,
                                               }}
                                               name={'propertyValue'}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.propertyValue}>
                                </OutlinedInput>
                                {getError(touched.propertyValue, errors.propertyValue)}
                            </FormControl>
                            <IconButton classes={{root: classesButton.root}}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <div className={'right-column-add-button'}>
                            <IconButton classes={{root: classesButton.root}}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default AddPropertyToProduct;