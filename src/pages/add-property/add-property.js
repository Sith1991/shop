import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';

import { StyledRadio } from '../../components/styled-radio-icon';
import { postItemsToDatabase } from '../../services';

import {
  theme,
  useAddItemLabelStyles,
  useAddItemInputStyles,
  useSaveButtonStyles,
  usePropertyLabelStyles,
} from '../../styles/customizing-material-ui-components';

import './add-property.scss';

const AddProperty = ({
  properties,
  propertiesError,
  createdProperty,
  propertiesSpinnerOpen,
  propertiesSpinnerClose,
}) => {
  const classesLabel = useAddItemLabelStyles();

  const classesInput = useAddItemInputStyles();

  const classesSaveBtn = useSaveButtonStyles();

  const classesRadioButtons = usePropertyLabelStyles();

  const validateNames = (arr, value) => {
    const result = arr.find(
      (el) => el?.propertyName.toLowerCase() === value?.toLowerCase()
    );
    return !result;
  };

  const validationSchema = yup.object().shape({
    propertyName: yup
      .string()
      .typeError('Должно быть строкой')
      .test('sameName', 'Свойство с таким именем уже существует', (value) => {
        if (!value) return true; // если поле пустое, перейдет к следующей проверке required
        return validateNames(properties, value); // возвращает false, если свойство с таким именем уже существует
      })
      .required('Обязательное поле'),
    propertyType: yup
      .string()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      propertyName: '',
      propertyType: 'Dropdown',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      propertiesSpinnerOpen();
      const { propertyName } = values;
      const trimmedPropertyName = propertyName.trim();
      const newValues = {
        ...values,
        propertyName: trimmedPropertyName,
      };

      await postItemsToDatabase(
        newValues,
        'properties',
        propertiesError,
        propertiesSpinnerClose,
        createdProperty
      );
    },
    validateOnBlur: true,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    dirty,
  } = formik;

  const getError = (touched, error) => {
    return touched && error && <FormHelperText>{error}</FormHelperText>;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={'add-property'}>
        <div className={'add-property-bordered-wrap'}>
          <form onSubmit={handleSubmit} className={'add-property-wrap'}>
            <div className={'buttons-wrap'}>
              <Link to={'/property-list'} className={'button-back'}>
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
                onClick={handleSubmit}
              >
                Сохранить
              </Button>
            </div>
            <div className={'add-prop-head'}>
              <h5>Добавление свойства</h5>
            </div>
            <div className={'add-prop-body'}>
              <FormControl error={Boolean(touched.propertyName && errors.propertyName)}>
                <FormLabel
                  classes={{ root: classesLabel.root }}
                  className={'labels'}
                >
                  Название свойства<span className={'red-star'}>*</span>
                </FormLabel>
                <OutlinedInput
                  type="text"
                  variant="outlined"
                  notched={false}
                  placeholder="Название свойства"
                  multiline
                  classes={{
                    root: classesInput.root,
                  }}
                  name={'propertyName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.propertyName}
                />
                {getError(touched.propertyName, errors.propertyName)}
              </FormControl>

              <FormControl error={touched.propertyType && errors.propertyType}>
                <FormLabel
                  classes={{ root: classesLabel.root }}
                  focused={false}
                  className={'labels'}
                >
                  Укажите тип свойства<span className={'red-star'}>*</span>
                </FormLabel>
                <RadioGroup
                  name="propertyType"
                  value={values.propertyType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel
                    value="Dropdown"
                    control={<StyledRadio />}
                    classes={{
                      root: classesRadioButtons.root,
                      label: classesRadioButtons.label,
                    }}
                    label="Dropdown"
                  />
                  <FormControlLabel
                    value="Number"
                    classes={{
                      root: classesRadioButtons.root,
                      label: classesRadioButtons.label,
                    }}
                    control={<StyledRadio />}
                    label="Number"
                  />
                  <FormControlLabel
                    value="String"
                    classes={{
                      root: classesRadioButtons.root,
                      label: classesRadioButtons.label,
                    }}
                    control={<StyledRadio />}
                    label="String"
                  />
                </RadioGroup>
                {getError(touched.propertyType, errors.propertyType)}
              </FormControl>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddProperty;
