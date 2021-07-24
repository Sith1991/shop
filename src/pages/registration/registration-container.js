import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userIsAuth } from '../../store/actions';
import Registration from './registration';

const RegistrationContainer = ({ logIn, userIsAuth }) => {
  useEffect(() => {
    userIsAuth();
  }, [userIsAuth]);

  if (logIn) {
    return <Redirect to={'/'} />;
  }

  return <Registration />;
};

const mapStateToProps = (state) => {
  return {
    logIn: state.isAuth.logIn,
  };
};

const mapDispatchToProps = {
  userIsAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
