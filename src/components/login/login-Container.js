import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {userIsAuth} from "../../store/actions/isAuth-actions";
import Login from "./login";
import {Redirect} from 'react-router-dom';

const LoginContainer = ({logIn, userIsAuth}) => {

    useEffect(() => {
        userIsAuth()
    }, [])

    if (logIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <Login />
    )
}

const mapStateToProps = (state) => {
    return {
        logIn: state.isAuth.logIn,
    }
}

const mapDispatchToProps = {
    userIsAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);