import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import {storage} from "../../services/firebase-service";
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
import PriceFormatInput from "../price-format-input";
import {withRouter} from 'react-router-dom';

import "./add-item.scss";

const AddItem = ({history, products, properties}) => {

    const classesLabel = useAddItemLabelStyles();

    const classesInput = useAddItemInputStyles();

    const classesSaveBtn = useSaveButtonStyles();

    const classesUploadBtn = useUploadButtonStyles();

    const classesTextarea = useAddItemTextareaStyles();

    const priceFormat = (value) => {
        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    const idForNewProduct = (products) => {
        if (products.length === 0) {
            return 0
        }
        const idxLastProperty = products.length - 1;
        const lastId = products[idxLastProperty].id;
        return lastId + 1
    }

    const getDateOfChange = () => {
        return firebase.database.ServerValue.TIMESTAMP;  // получение таймстампа с сервера Firebase
    }

    const validationSchema = yup.object().shape({
        itemName: yup.string().typeError('Должно быть строкой').trim('Без паробелов').required('Обязательное поле'),
        price: yup.number().typeError('Должно быть числом').integer('Должно быть целым числом')
            .test('firstSymbol', 'Стоимость не должна ровняться нулю', (value) => {
                return value?.toString().charAt(0) !== '0';     // число НЕ должно быть 0
            }).required('Обязательное поле'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'Размер файла не должен превышать 150кб', (value) => {
                if (!value) return false
                return value.size < 153600
            }).required(),
            type: yup.string().oneOf(['image/jpeg', 'image/png', 'image/pjpeg'], 'Добавьте файл с правильным форматом .jpg,.jpeg,.png').required(),
            name: yup.string().required()
        }).typeError('Добавьте файл')).required(),
        fileUrl: yup.string().typeError('Должно быть строкой'),
        description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        propertyName: yup.string().typeError('Должно быть строкой'),
        propertyValue: yup.string().typeError('Должно быть строкой'),
    });

    const getFileSchema = (file) => (file && {
        file: file,
        type: file.type,
        name: file.name
    })

    const [image, setImage] = useState(null);

    const fileHandleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

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
    };

    const getError = (touched, error) => {
        return touched && error && <FormHelperText>{error}</FormHelperText>
    };

    const formik = useFormik({
        initialValues: {
            id: idForNewProduct(products),
            itemName: '',
            price: '',
            file: undefined,
            fileUrl: '',
            dateOfChange: '',
            description: '',
            propertyName: '',
            propertyValue: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // добавление случайного шестизначного числа к названию файла, для того что бы файлы с одинаковыми именами
            // не перезаписывали друг друга
            const fileNameWithRndNumber = `${image.name}_${Math.floor(Math.random() * 1000000)}`;
            const uploadTask = storage.ref(`images/${fileNameWithRndNumber}`).put(image);
            await uploadTask.on(
                "state_changed",
                snapshot => {
                },
                error => {
                    console.log('error: ', error);
                },
                () => {
                    storage
                        .ref('images')
                        .child(fileNameWithRndNumber)
                        .getDownloadURL()
                        .then(url => {
                            const {itemName, description, price, propertyValue} = values;
                            const trimmedItemName = itemName.trim();
                            const trimmedDescription = description.trim();
                            const trimmedPropertyValue = propertyValue.trim();
                            const numberedPrice = parseInt(String(price).replace(/ /g, ''));
                            const newValues = {
                                ...values,
                                itemName: trimmedItemName,
                                description: trimmedDescription,
                                price: numberedPrice,
                                propertyValue: trimmedPropertyValue,
                                file: [],                               // чистим массив с фото, т.к. он не нужен в
                                                                        // realtime firebase, файл загружается в storage
                                fileUrl: url,
                            };

                            const db = firebase.database();
                            const ref = db.ref('products');
                            const dbDataRef = ref.push();
                            dbDataRef.set({...newValues, dateOfChange: getDateOfChange()},
                                function (error) {
                                    if (error) {
                                        alert("Data could not be saved." + error);
                                    } else {
                                        history.push('/');
                                        alert("Data saved successfully.");
                                    }
                                });
                        });
                }
            );
        },
        validateOnBlur: true,
    });

    const {
        values, errors, touched, handleChange,
        handleBlur, isValid, handleSubmit, dirty, setFieldTouched
    } = formik;

    return (
        <FormikProvider value={formik}> {/*для того чтобы работал arrayHelper в инпуте file*/}
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
                                                       input: classesInput.input,
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
                                                        fileHandleChange(event);
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
                                <Thumb
                                    file={(values.file === undefined || values.file[0] === null) ? null : values.file[0].file}/>
                                <FormControl error={touched.description && errors.description}>
                                    <FormLabel classes={{root: classesLabel.root}}
                                               className={'labels'}>Описание</FormLabel>
                                    <OutlinedInput type="text"
                                                   multiline={true}
                                                   rows={5}
                                                   inputProps={{maxLength: 1000}}
                                                   variant="outlined"
                                                   notched={false}
                                                   placeholder='Описание товара'
                                                   className={'add-item-textarea'}
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
                            <AddPropertyToProduct handleChange={handleChange}
                                                  touched={touched}
                                                  errors={errors}
                                                  handleBlur={handleBlur}
                                                  values={values}
                                                  getError={getError}/>
                        </form>
                    </div>
                </div>
            </ThemeProvider>
        </FormikProvider>
    )
}

export default withRouter(AddItem);