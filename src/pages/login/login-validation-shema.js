import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .typeError('Должно быть строкой')
    .min(4, 'Логин должен быть не менее 4 символов')
    .max(20, 'Логин должен быть не болле 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .required('Обязательное поле'),
});