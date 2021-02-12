import React from 'react';
import {FormGroup, FormLabel} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

import './registration.scss';

const Registration = () => {

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        verificationPassword: '',
        showPassword: false,
        showVerificationPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleClickShowVerificationPassword = () => {
        setValues({...values, showVerificationPassword: !values.showVerificationPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={'registration'}>
            <div className={'registration-wrap'}>
                <h4>Регистрация</h4>
                <div className={'form-wrap'}>
                    <FormGroup>
                        <FormLabel>Имя</FormLabel>
                        <OutlinedInput type="text"
                                       variant="outlined"
                                       notched={false}
                                       placeholder='Введите имя'>
                        </OutlinedInput>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Фамилия</FormLabel>
                        <OutlinedInput type="text"
                                       variant="outlined"
                                       notched={false}
                                       placeholder='Введите фамилию'>
                        </OutlinedInput>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>E-mail</FormLabel>
                        <OutlinedInput type="email"
                                       variant="outlined"
                                       notched={false}
                                       placeholder='Введите ваш e-mail'>
                        </OutlinedInput>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Пароль</FormLabel>
                        <OutlinedInput
                            notched={false}
                            placeholder='Введите пароль'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Повторите пароль</FormLabel>
                        <OutlinedInput
                            notched={false}
                            placeholder='Введите пароль'
                            type={values.showVerificationPassword ? 'text' : 'password'}
                            value={values.verificationPassword}
                            onChange={handleChange('verificationPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowVerificationPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showVerificationPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormGroup>
                </div>
                <div>
                    <Button className={'registration-button'} variant={"warning"} type="submit">
                        Зарегестрироваться
                    </Button>
                </div>
                <div className={'link'}>
                    <Link to={'/login'}>
                        Вернуться
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Registration;