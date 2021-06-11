import React from 'react';
import {Link} from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import theme from "../../styles/customizing-material-ui-components/theme";
import useLoginButtonStyles from "../../styles/customizing-material-ui-components/button-login-style";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import useProductCardItemSelectStyles
    from "../../styles/customizing-material-ui-components/product-card-item-select-style";

import './product-card.scss';
import {mixed} from "yup";

const ProductCard = ({selectedProduct, clearSelectedProduct}) => {

    const classes = useLoginButtonStyles();
    const classesSelect = useProductCardItemSelectStyles();

    const {itemName, fileUrl, description, price, propertiesOfProduct} = selectedProduct;

    const renderMenuItems = (item) => {
        const {propertyValue} = item;
        return (
            <MenuItem value={propertyValue}>{propertyValue}</MenuItem>
        )
    };

    const renderPropertiesOfProduct = (property, index) => {
        const {propertyName, propertyType, propertyValue} = property;
        switch (propertyType) {
            case 'Dropdown':
                return (
                    <div>
                        <h4>{propertyName}</h4>
                        <FormControl variant="outlined" className={classesSelect.formControl}>
                            <Select
                                classes={{
                                    root: classesSelect.root,
                                    icon: classesSelect.icon
                                }}
                                name={`propertiesOfProduct.${index}.propertyValue`}
                                value={values.propertiesOfProduct[index].propertyValue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                notched={false} /*Если true, на контуре сделана выемка для размещения имени селекта.*/
                            >
                                {console.log(values.propertiesOfProduct[index].propertyValue)}
                                {propertyValue.map(renderMenuItems)}
                            </Select>
                        </FormControl>
                    </div>
                );
            case 'Number':
                return (
                    <div>
                        <h4>{propertyName}</h4>
                        <p>{propertyValue}</p>
                    </div>
                );
            case 'String':
                return (
                    <div>
                        <h4>{propertyName}</h4>
                        <p>{propertyValue}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const validationSchema = yup.object().shape({
        itemName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        fileUrl: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        price: yup.number().typeError('Должно быть числом').integer('Должно быть целым числом').required('Обязательное поле'),
        propertiesOfProduct: yup.array().of(yup.object().shape({
                id: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
                propertyName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
                propertyType: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
                propertyValue: yup.
            }).required('Обязательное поле'),
        ),
    });

    const formik = useFormik({
        initialValues: {
            itemName: itemName,
            description: description,
            fileUrl: fileUrl,
            price: price,
            propertiesOfProduct: propertiesOfProduct ? propertiesOfProduct : [],
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
                        <Link to={'/'} onClick={clearSelectedProduct}>
                            Вернуться
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className={'product-card-wrapper'}>
                        <div className={'header-items-row'}>
                            <div className={'item-image'}>
                                <img src={fileUrl} alt="product"/>
                            </div>
                            <div className={'item-information'}>
                                <h3>{itemName}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className={"bottom-items-row"}>
                            <div className={"item-properties"}>
                                {propertiesOfProduct && propertiesOfProduct.map(renderPropertiesOfProduct)}
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
                                        disabled={!isValid}
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