import React from 'react';
import { connect } from 'react-redux';
import { Main } from './index';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc';

const MainContainer = ({email, history}) => {
  return <Main email={email} history={history}/>;
};

const mapStateToProps = (state) => {
  return {
    email: state.isAuth.email,
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, null)
)(MainContainer);