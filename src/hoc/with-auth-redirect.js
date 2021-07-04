import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spinner } from '../components/spinner';

let mapStateToPropsForRedirect = (state) => ({
  logIn: state.isAuth.logIn,
  loading: state.isAuth.loading,
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (this.props.loading) return <Spinner />;

      if (!this.props.logIn) return <Redirect to={'/login'} />;

      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
