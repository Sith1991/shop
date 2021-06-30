import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {userIsAuth} from "../../store/actions/is-auth-actions";
import {Redirect} from 'react-router-dom';
import Registration from "./registration";

const RegistrationContainer = ({logIn, userIsAuth}) => {

    useEffect(() => {
        userIsAuth()
    }, [])

    if (logIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <Registration />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);