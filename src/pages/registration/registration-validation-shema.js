import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, 'Имя должно быть не менее 4 символов')
    .max(20, 'Имя должно быть не более 20 символов')
    .typeError('Должно быть строкой')
    .required('Обязательное поле'),
  secondName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
  password: yup
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .typeError('Должно быть строкой')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  email: yup.string().email('Введите верный email').required('Обязательное поле'),
});