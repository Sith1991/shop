import React from "react";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {FormControl, FormHelperText, FormLabel} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import theme from "../../styles/customizing-material-ui-components/theme";
import useStyles from "../../styles/customizing-material-ui-components/button-registration-style";
import {Link} from "react-router-dom";

import './registration.scss';

const Registration = () => {

    const classes = useStyles();

    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        secondName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле'),
        email: yup.string().email('Введите верный email').required('Обязательное поле'),
    });

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
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
        validateOnBlur: true,
    });
    const {values, errors, touched, handleChange,
        handleBlur, isValid, handleSubmit, dirty, setFieldValue} = formik;
    return (
        <div className={'registration'}>
            <form onSubmit={handleSubmit} className={'registration-wrap'}>
                <h4>Регистрация</h4>
                <div className={'form-wrap'}>
                        <FormControl fullWidth error={touched.name && errors.name}>
                            <FormLabel>Имя</FormLabel>
                            <OutlinedInput type="text"
                                           variant="outlined"
                                           notched={false}
                                           placeholder='Введите имя'
                                           name={'name'}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.name}>
                            </OutlinedInput>
                            {touched.name && errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={touched.secondName && errors.secondName}>
                            <FormLabel>Фамилия</FormLabel>
                            <OutlinedInput type="text"
                                           variant="outlined"
                                           notched={false}
                                           placeholder='Введите фамилию'
                                           name={'secondName'}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.secondName}>
                            </OutlinedInput>
                            {touched.secondName && errors.secondName && <FormHelperText>{errors.secondName}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={touched.email && errors.email}>
                            <FormLabel>E-mail</FormLabel>
                            <OutlinedInput type="email"
                                           variant="outlined"
                                           notched={false}
                                           placeholder='Введите ваш e-mail'
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
                        <FormControl fullWidth error={touched.confirmPassword && errors.confirmPassword}>
                            <FormLabel>Повторите пароль</FormLabel>
                            <OutlinedInput
                                notched={false}
                                placeholder='Повторите пароль'
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
                                            {values.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.confirmPassword && errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
                        </FormControl>
                </div>
                <div className={'registration-button'}>
                    <ThemeProvider theme={theme}>
                        <Button
                            classes={{
                                root: classes.root,
                                label: classes.label,
                            }}
                            type={'submit'}
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}>
                            Зарегестрироваться
                        </Button>
                    </ThemeProvider>
                </div>
                <div className={'link'}>
                    <Link to={'/login'}>
                        Вернуться
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;