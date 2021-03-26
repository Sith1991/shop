import React from 'react';
import {Link} from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import './product-card.scss';
import theme from "../../styles/customizing-material-ui-components/theme";
import useLoginButtonStyles from "../../styles/customizing-material-ui-components/button-login-style";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import useProductCardItemSelectStyles
    from "../../styles/customizing-material-ui-components/product-card-item-select-style";

const ProductCard = () => {

    const classes = useLoginButtonStyles();
    const classesSelect = useProductCardItemSelectStyles();

    const data = {
        id: 1,
        itemName: 'Mercedes S550 4matic',
        file: 'https://i.ibb.co/bs9QvD9/image.png',
        description: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий. ',
        price: 118000,
        properties: {
            property_1: {
                property_1_Name: 'Цвет авто',
                property_1_Value_1: 'Синий',
                property_1_Value_2: 'Черный',
            },
            property_2: {
                property_2_Name: 'Год выпуска',
                property_2_Value_1: 2017,
            },
            property_3: {
                property_3_Name: 'Тип топлива',
                property_3_Value_1: 'Бензин',
            }
        },
    }

    const {
        itemName, file, description, price,
        properties: {
            property_1: {
                property_1_Name,
                property_1_Value_1,
                property_1_Value_2
            },
            property_2: {
                property_2_Name,
                property_2_Value_1,
            },
            property_3: {
                property_3_Name,
                property_3_Value_1,
            },
        }
    } = data;

    const validationSchema = yup.object().shape({
        itemName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        file: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        price: yup.number().typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательное поле'),
        properties: yup.object(),
    });

    const formik = useFormik({
        initialValues: {
            itemName: itemName,
            description: description,
            file: file,
            price: price,
            properties: {properties: {
                    property_1: {
                        property_1_Name,
                        property_1_Value: '',
                    },
                    property_2: {
                        property_2_Name,
                        property_2_Value_1,
                    },
                    property_3: {
                        property_3_Name,
                        property_3_Value_1,
                    },
                }},
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            console.log(values)
        },
        validateOnBlur: true,
    });

    const {values, handleChange, handleBlur, isValid, handleSubmit, dirty} = formik;

    return (
        <div className={'product-card'}>
            <div className={'product-card-bordered-wrap'}>
                <div className={"product-card-wrap"}>
                    <div className={'link'}>
                        <Link to={'/'}>
                            Вернуться
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className={'product-card-wrapper'}>
                        <div className={'header-items-row'}>
                            <div className={'item-image'}>
                                <img src={file} alt="product"/>
                            </div>
                            <div className={'item-information'}>
                                <h3>{itemName}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className={"bottom-items-row"}>
                            <div className={"item-properties"}>
                                <h4>{property_1_Name}</h4>
                                <FormControl variant="outlined" className={classesSelect.formControl}>
                                <Select
                                    classes={{root:classesSelect.root,
                                        icon:classesSelect.icon}}
                                    name={'properties.properties.property_1.property_1_Value'}
                                    value={values.properties.properties.property_1.property_1_Value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    notched={false}
                                >
                                    <MenuItem value={property_1_Value_1}>{property_1_Value_1}</MenuItem>
                                    <MenuItem value={property_1_Value_2}>{property_1_Value_2}</MenuItem>
                                </Select>
                                </FormControl>
                                <h4>{property_2_Name}</h4>
                                <p>{property_2_Value_1}</p>
                                <h4>{property_3_Name}</h4>
                                <p>{property_3_Value_1}</p>
                                <h4>Стоимость</h4>
                                <span className={'price'}>{price.toLocaleString('ru-RU')}$</span>
                            </div>
                            <div className={"button-wrap"}>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        classes={{
                                            root: classes.root,
                                            label: classes.label,
                                        }}
                                        type={'submit'}
                                        disabled={!isValid || !dirty}
                                        onClick={handleSubmit}>
                                        Беру!!!
                                    </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;