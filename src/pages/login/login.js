import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import { FormControl, FormHelperText, FormLabel, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { ErrorMessageText } from '../../components/error-message-text';
import { submitLogIn } from '../../services';
import { loginValidationSchema } from './login-validation-shema';
import { FormHelperTextStyled } from "../../components/form-helper-text";

import { useLoginButtonStyles } from '../../styles/customizing-material-ui-components';

import './login.scss';

const Login = ({ history }) => {
  const classes = useLoginButtonStyles();

  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      submitLogIn(values)
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
    <div className={'login'}>
      <Tooltip title="Login: admin@admin.com Password: admin123">
        <form onSubmit={handleSubmit} className={'form-wrap'}>
          <h4>Вход</h4>
          {errorMessage ? <ErrorMessageText message={errorMessage} /> : null}
          <div className={'login-wrap'}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
              <FormLabel>Логин</FormLabel>
              <OutlinedInput
                type="text"
                variant="outlined"
                notched={false}
                placeholder="Введите логин"
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
                      onClick={() => setFieldValue('showPassword', !values.showPassword)}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && <FormHelperTextStyled>{errors.password}</FormHelperTextStyled>}
            </FormControl>
          </div>
          <div className={'login-button'}>
            <Button
              classes={{
                root: classes.root,
                label: classes.label,
              }}
              type={'submit'}
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </div>
          <div className={'link'}>
            <Link to={'/registration'}>Зарегестрироваться</Link>
          </div>
        </form>
      </Tooltip>
    </div>
  );
};

export default withRouter(Login);
