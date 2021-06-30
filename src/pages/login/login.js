import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link, withRouter} from "react-router-dom";
import {FormControl, FormHelperText, FormLabel} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import theme from "../../styles/customizing-material-ui-components/theme";
import useLoginButtonStyles from "../../styles/customizing-material-ui-components/button-login-style";
import ErrorMessageText from "../../components/error-message-text";
import {submitLogIn} from "../../services/firebase-service";

import './login.scss';

const Login = ({history}) => {

    const classes = useLoginButtonStyles();

    const [errorMessage, setErrorMessage] = useState(null);

    const validationSchema = yup.object().shape({
        email: yup.string().typeError('Должно быть строкой')
            .min(4, "Логин должен быть не менее 4 символов")
            .max(20, "Логин должен быть не болле 20 символов")
            .required('Обязательное поле'),
        password: yup.string().typeError('Должно быть строкой')
            .min(8, "Пароль должен быть не менее 8 символов")
            .required('Обязательное поле'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            showPassword: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitLogIn(values)
                .then(() => {
                    setErrorMessage(null);
                    history.push('/');
                })
                .catch(e => {
                    console.log(e.message);
                    setErrorMessage(e.message);
                });
        },
        validateOnBlur: true,
    });

    const {values, errors, touched, handleChange,
        handleBlur, isValid, handleSubmit, dirty, setFieldValue} = formik;

    return (
        <div className={'login'}>
            <form onSubmit={handleSubmit} className={'form-wrap'}>
                <h4>Вход</h4>
                {errorMessage ? <ErrorMessageText message={errorMessage}/> : null}
                <div className={'login-wrap'}>
                    <FormControl fullWidth error={touched.email && errors.email}>
                        <FormLabel>Логин</FormLabel>
                        <OutlinedInput type="text"
                                       variant="outlined"
                                       notched={false}
                                       placeholder='Введите логин'
                                       name={'email'}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.email}>
                        </OutlinedInput>
                        {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                    </FormControl>
                    <FormControl fullWidth error={touched.password && errors.password}>
                        <FormLabel>Пароль</FormLabel>
                        <OutlinedInput
                            notched={false}
                            placeholder='Введите пароль'
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
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {touched.password && errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                </div>
                <div className={'login-button'}>
                    <ThemeProvider theme={theme}>
                        <Button
                            classes={{
                                root: classes.root,
                                label: classes.label,
                            }}
                            type={'submit'}
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}>
                            Войти
                        </Button>
                    </ThemeProvider>
                </div>
                <div className={'link'}>
                    <Link to={'/registration'}>
                        Зарегестрироваться
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login);