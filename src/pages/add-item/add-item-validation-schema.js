import * as yup from 'yup';

export const addItemValidationSchema = yup.object().shape({
  itemId: yup.boolean(),
  itemName: yup.string().typeError('Должно быть строкой').trim('Без паробелов').required('Обязательное поле'),
  price: yup
    .number()
    .typeError('Должно быть числом')
    .integer('Должно быть целым числом')
    .test('firstSymbol', 'Стоимость не должна ровняться нулю', (value) => {
      return value?.toString().charAt(0) !== '0'; // число НЕ должно быть 0
    })
    .required('Обязательное поле'),
  file: yup.object().when('itemId', {
    is: true,
    then: yup
      .object()
      .shape({
        file: yup.mixed().test('fileSize', 'Размер файла не должен превышать 150кб', (value) => {
          return value ? value.size < 153600 : true;
        }),
        type: yup
          .string()
          .oneOf(['image/jpeg', 'image/png', 'image/pjpeg'], 'Добавьте файл с правильным форматом .jpg,.jpeg,.png'),
        name: yup.string(),
      })
      .nullable()
      .typeError('Добавьте файл'),
    otherwise: yup
      .object()
      .shape({
        file: yup
          .mixed()
          .test('fileSize', 'Размер файла не должен превышать 150кб', (value) => {
            return value ? value.size < 153600 : true;
          })
          .typeError('Добавьте файл')
          .required('Добавьте файл'),
        type: yup
          .string()
          .oneOf(['image/jpeg', 'image/png', 'image/pjpeg'], 'Добавьте файл с правильным форматом .jpg,.jpeg,.png')
          .typeError('Добавьте файл')
          .required('Добавьте файл'),
        name: yup.string().typeError('Добавьте файл').required('Добавьте файл'),
      })
      .required(),
  }),
  fileUrl: yup.string().nullable().typeError('Должно быть строкой'),
  description: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
  propertiesOfProduct: yup.array().of(
    yup
      .object()
      .shape({
        id: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        propertyName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        propertyType: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        propertyValue: yup.lazy((value) => {
          switch (typeof value) {
            case 'number':
              return yup.number().typeError('Должно быть числом').required('Обязательное поле');
            case 'string':
              return yup.string().typeError('Должно быть строкой').required('Обязательное поле');
            default:
              return yup
                .array()
                .of(
                  yup.object().shape({
                    propertyValue: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
                  }),
                )
                .required('Обязательное поле');
          }
        }),
      })
      .required('Обязательное поле'),
  ),
});