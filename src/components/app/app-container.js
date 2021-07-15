import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { App } from './index';
import { userIsAuth } from '../../store/actions';

const AppContainer = ({ userIsAuth }) => {

  useEffect(() => {
    userIsAuth();
  }, [userIsAuth]);

  return <App />;
};

const mapDispatchToProps = {
  userIsAuth,
};

export default connect(null, mapDispatchToProps)(AppContainer);