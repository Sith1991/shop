import React, {useEffect} from 'react';
import { App } from './index';
import { connect } from 'react-redux';
import { userIsAuth } from '../../store/actions';

const AppContainer = ({ userIsAuth }) => {

  useEffect(() => {
    userIsAuth();
  }, []);

  return <App />;
};

const mapDispatchToProps = {
  userIsAuth,
};

export default connect(null, mapDispatchToProps)(AppContainer);