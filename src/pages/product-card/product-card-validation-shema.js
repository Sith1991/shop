import * as yup from "yup";

export const productCardValidationSchema = yup.object().shape({
    itemName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    fileUrl: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    price: yup
        .number()
        .typeError('Должно быть числом')
        .integer('Должно быть целым числом')
        .required('Обязательное поле'),
    propertiesOfProduct: yup.array().of(
        yup.object().shape({
            id: yup.string(),
            propertyName: yup.string(),
            propertyType: yup.string(),
            propertyValue: yup.string(),
        }),
    ),
});