import * as yup from 'yup';

const validateNames = (arr, value) => {
  const result = arr.find((el) => el?.propertyName.toLowerCase() === value?.toLowerCase());
  return !result;
};

export const addPropertyValidationSchema = (properties) => {
  return yup.object().shape({
    propertyName: yup
      .string()
      .typeError('Должно быть строкой')
      .test('sameName', 'Свойство с таким именем уже существует', (value) => {
        if (!value) return true; // если поле пустое, перейдет к следующей проверке required
        return validateNames(properties, value); // возвращает false, если свойство с таким именем уже существует
      })
      .trim('Без паробелов')
      .required('Обязательное поле'),
    propertyType: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
  });
};