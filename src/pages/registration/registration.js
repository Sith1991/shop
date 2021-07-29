import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { FormControl, FormLabel } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link, withRouter } from 'react-router-dom';

import { ErrorMessageText } from '../../components/error-message-text';
import { submitRegistration } from '../../services';
import { registrationValidationSchema } from './registration-validation-shema';
import { FormHelperTextStyled } from "../../components/form-helper-text";

import { useRegistrationButtonStyles } from '../../styles/customizing-material-ui-components';

import './registration.scss';

const Registration = ({ history }) => {
  const classes = useRegistrationButtonStyles();

  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      secondName: '',
      password: '',
      confirmPassword: '',
      email: '',
      showPassword: false,
      showConfirmPassword: false,
    },
    validationSchema: registrationValidationSchema,
    onSubmit: (values) => {
      submitRegistration(values)
        .then(() => {
          setErrorMessage(null);
          history.push('/');
        })
        .catch((e) => {
          console.log(e.message);
          setErrorMessage(e.message);
        });
    },
    validateOnBlur: true,
  });
  const { values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty, setFieldValue } = formik;
  return (
    <div className={'registration'}>
      <form onSubmit={handleSubmit} className={'form-wrap'}>
        <h4>Регистрация</h4>
        {errorMessage ? <ErrorMessageText message={errorMessage} /> : null}
        <div className={'registration-wrap'}>
          <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
            <FormLabel>Имя</FormLabel>
            <OutlinedInput
              type="text"
              variant="outlined"
              notched={false}
              placeholder="Введите имя"
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name && <FormHelperTextStyled>{errors.name}</FormHelperTextStyled>}
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.secondName && errors.secondName)}>
            <FormLabel>Фамилия</FormLabel>
            <OutlinedInput
              type="text"
              variant="outlined"
              notched={false}
              placeholder="Введите фамилию"
              name={'secondName'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secondName}
            />
            {touched.secondName && errors.secondName && <FormHelperTextStyled>{errors.secondName}</FormHelperTextStyled>}
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <FormLabel>E-mail</FormLabel>
            <OutlinedInput
              type="email"
              variant="outlined"
              notched={false}
              placeholder="Введите ваш e-mail"
              name={'email'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && <FormHelperTextStyled>{errors.email}</FormHelperTextStyled>}
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
            <FormLabel>Пароль</FormLabel>
            <OutlinedInput
              notched={false}
              placeholder="Введите пароль"
              type={values.showPassword ? 'text' : 'password'}
              name={'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    name={'showPassword'}
                    onClick={() => setFieldValue('showPassword', !values.showPassword)} // меняю значение в showPassword на обратное, что бы показать или скрыть пароль
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.password && errors.password && <FormHelperTextStyled>{errors.password}</FormHelperTextStyled>}
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)}>
            <FormLabel>Повторите пароль</FormLabel>
            <OutlinedInput
              notched={false}
              placeholder="Повторите пароль"
              type={values.showConfirmPassword ? 'text' : 'password'}
              name={'confirmPassword'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    name={'showConfirmPassword'}
                    onClick={() => setFieldValue('showConfirmPassword', !values.showConfirmPassword)}
                    edge="end"
                  >
                    {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <FormHelperTextStyled>{errors.confirmPassword}</FormHelperTextStyled>
            )}
          </FormControl>
        </div>
        <div className={'registration-button'}>
          <Button
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            type={'submit'}
            disabled={!isValid || !dirty}
            onClick={handleSubmit}
          >
            Зарегестрироваться
          </Button>
        </div>
        <div className={'link'}>
          <Link to={'/login'}>Вернуться</Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Registration);
