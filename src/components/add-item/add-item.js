import React from 'react';
import AddPropertyToProduct from "../add-property-to-product";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import theme from "../../styles/customizing-material-ui-components/theme";
import {FieldArray, FormikProvider, useFormik} from "formik";
import useSaveButtonStyles from "../../styles/customizing-material-ui-components/button-save-style";
import useUploadButtonStyles from "../../styles/customizing-material-ui-components/button-upload-style";
import useAddItemLabelStyles from "../../styles/customizing-material-ui-components/add-item-label-style";
import {FormControl, FormHelperText, FormLabel} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import themeUploadBtn from "../../styles/customizing-material-ui-components/theme-upload-btn";
import useAddItemInputStyles from "../../styles/customizing-material-ui-components/add-item-input-style";
import useAddItemTextareaStyles from "../../styles/customizing-material-ui-components/add-item-textarea-style";
import NumberFormat from 'react-number-format';
import Thumb from "../thumb";

import "./add-item.scss";

const PriceFormatInput = ({classesInput, onChange, onBlur, values}) => {

    return (
        <OutlinedInput /*type="number"*/
            variant="outlined"
            notched={false}
            placeholder='Стоимость товара'
            className={'number-input'}
            classes={{
                root: classesInput.root,
                input: classesInput.input
            }}
            name={'price'}
            onChange={onChange}                      // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
            onBlur={onBlur}                          // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
            value={values.price}>
        </OutlinedInput>
    )
}

const AddItem = () => {

    const classesLabel = useAddItemLabelStyles();

    const classesInput = useAddItemInputStyles();

    const classesSaveBtn = useSaveButtonStyles();

    const classesUploadBtn = useUploadButtonStyles();

    const classesTextarea = useAddItemTextareaStyles();

    const validationSchema = yup.object().shape({
        itemName: yup.string().typeError('Должно быть строкой').trim('Без паробелов').required('Обязательное поле'),
        price: yup.number().typeError('Должно быть числом').integer('Должно быть целым числом')
            .test('firstSymbol', 'Стоимость не должна ровняться нулю', (value) => {
                if (!value && value !== 0) return true
                else return value.toString().charAt(0) !== '0';
            }).required('Обязательное поле'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла не должен превышать 100кб', (value) => {
                if (!value) return false
                return value.size < 102400
            }).required(),
            type: yup.string().oneOf(['image/jpeg', 'image/png', 'image/pjpeg'], 'Добавьте файл с правильным форматом .jpg,.jpeg,.png').required(),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required(),
        description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    });

    const getFileSchema = (file) => (file && {
        file: file,
        type: file.type,
        name: file.name
    })

    const getArrErrorsMessages = (errors) => {
        const result = []
        errors && Array.isArray(errors) && errors.forEach((value) => {
            if (typeof value === 'string') {
                result.push(value)
            } else {
                Object.values(value).forEach((error) => {
                    result.push(error)
                })
            }
        })
        return result
    }

    const getError = (touched, error) => {
        return touched && error && <FormHelperText>{error}</FormHelperText>
    }

    const formik = useFormik({
        initialValues: {
            itemName: '',
            price: '',
            file: undefined,
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {itemName, description, price} = values;
            const trimmedItemName = itemName.trim();
            const trimmedDescription = description.trim();
            const numberedPrice = parseInt(String(price).replace(/ /g, ''));
            const newValues = {
                ...values,
                itemName: trimmedItemName,
                description: trimmedDescription,
                price: numberedPrice
            };
            console.log(newValues)
        },
        validateOnBlur: true,
    });

    const {
        values, errors, touched, handleChange,
        handleBlur, isValid, handleSubmit, dirty, setFieldTouched
    } = formik;

    const priceFormat = (value) => {
        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    return (
        <FormikProvider value={formik}>
            <ThemeProvider theme={theme}>
                <div className={'add-item'}>
                    <div className={'add-item-bordered-wrap'}>
                        <form onSubmit={handleSubmit} className={'add-item-wrap'}>
                            <div className={'buttons-wrap'}>
                                <Link to={'/'} className={'button-back'}>
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
                                    onClick={handleSubmit}>
                                    Сохранить
                                </Button>
                            </div>
                            <div className={'add-item-head'}>
                                <h5>Добавление товара</h5>
                            </div>
                            <div className={'add-item-body'}>
                                <FormControl error={touched.itemName && errors.itemName}>
                                    <FormLabel classes={{root: classesLabel.root}}
                                               className={'labels'}>Название товара</FormLabel>
                                    <OutlinedInput type="text"
                                                   variant="outlined"
                                                   notched={false}
                                                   placeholder='Название товара'
                                                   multiline
                                                   classes={{
                                                       root: classesInput.root,
                                                   }}
                                                   name={'itemName'}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.itemName}>
                                    </OutlinedInput>
                                    {getError(touched.itemName, errors.itemName)}
                                </FormControl>

                                <FormControl error={touched.price && errors.price}>
                                    <FormLabel classes={{root: classesLabel.root}}
                                               className={'labels'}>Стоимость товара</FormLabel>
                                    <NumberFormat classesInput={classesInput}
                                                  onChange={handleChange}                   // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
                                                  onBlur={handleBlur}                       // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
                                                  values={values}
                                                  customInput={PriceFormatInput}
                                                  format={priceFormat}
                                    />
                                    {getError(touched.price, errors.price)}
                                </FormControl>

                                <FormControl error={touched.file && errors.file}>
                                    <FormLabel classes={{root: classesLabel.root}}
                                               className={'labels'}>Изображение</FormLabel>
                                    {console.log('file:', values.file)}
                                    <FieldArray name={'file'}>
                                        {(arrayHelper) => (
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
                                                        const {files} = event.target;
                                                        const file = getFileSchema(files.item(0));
                                                        setFieldTouched('file', true, false);
                                                        if (!file) {
                                                            arrayHelper.remove(0)
                                                            setFieldTouched('file', true, false);
                                                        }
                                                        if (Array.isArray(values.file)) {
                                                            arrayHelper.replace(0, file)
                                                        } else {
                                                            arrayHelper.push(file)
                                                        }
                                                    }}
                                                />
                                                <label className={'upload-bnt-label'} htmlFor="contained-button-file">
                                                    <ThemeProvider theme={themeUploadBtn}>
                                                        <Button variant="contained"
                                                                component="span"
                                                                disableRipple={true}
                                                                classes={{
                                                                    root: classesUploadBtn.root,
                                                                    label: classesUploadBtn.label,
                                                                }}
                                                                endIcon={<i className="fa fa-upload"
                                                                            aria-hidden="true"/>}>

                                                            {(values.file === undefined || values.file[0] === null)
                                                                ? <div className={'upload-btn-name'}>Выберите
                                                                    изображение</div> : values.file[0].file.name}
                                                        </Button>
                                                    </ThemeProvider>
                                                </label>
                                            </div>
                                        )}
                                    </FieldArray>
                                    {getArrErrorsMessages(errors.file).map((error) => getError(true, error))}
                                </FormControl>
                                    <Thumb file={(values.file === undefined || values.file[0] === null) ? null : values.file[0].file} />
                                <FormControl error={touched.description && errors.description}>
                                    <FormLabel classes={{root: classesLabel.root}}
                                               className={'labels'}>Описание</FormLabel>
                                    <OutlinedInput type="text"
                                                   multiline={true}
                                                   rows={6}
                                                   inputProps={{maxLength: 1000}}
                                                   variant="outlined"
                                                   notched={false}
                                                   placeholder='Описание товара'
                                                   classes={{
                                                       root: classesTextarea.root,
                                                   }}
                                                   name={'description'}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.description}>
                                    </OutlinedInput>
                                    {getError(touched.description, errors.description)}
                                </FormControl>
                            </div>
                            <AddPropertyToProduct/>
                        </form>
                    </div>
                </div>
            </ThemeProvider>

        </FormikProvider>

    )
}

export default AddItem;