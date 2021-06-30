import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {userIsAuth} from "../../store/actions";
import Login from "./login";
import {Redirect} from 'react-router-dom';
import Spinner from "../spinner";

const LoginContainer = ({logIn, userIsAuth, loading}) => {

    useEffect(() => {
        userIsAuth()
    }, [])

    if (loading) {
        return <Spinner />
    }

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
        loading: state.isAuth.loading,
    }
}

const mapDispatchToProps = {
    userIsAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);