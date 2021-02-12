import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import './login.scss';
import {FormGroup, FormLabel} from "@material-ui/core";


const Login = () => {

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={'login'}>
            <div className={'login-wrap'}>
                <h4>Вход</h4>
                <div className={'form-wrap'}>
                    <FormGroup>
                        <FormLabel>Логин</FormLabel>
                        <OutlinedInput type="email"
                                       variant="outlined"
                                       notched={false}
                                       placeholder='Введите логин'>
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
                </div>
                <div>
                    <Button className={'login-button'} variant={"warning"} type="submit">
                        Войти
                    </Button>
                </div>
                <div>
                    <Link to={'/registration'}>
                        Зарегестрироваться
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;