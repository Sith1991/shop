import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import {MainContainer} from "../../pages/main";
import { LoginContainer } from '../../pages/login';
import { RegistrationContainer } from '../../pages/registration';
import { ProductList } from '../../pages/product-list';
import { PropertyList } from '../../pages/property-list';
import { AddPropertyContainer } from '../../pages/add-property';
import { AddItemContainer } from '../../pages/add-item';
import { ProductCardContainer } from '../../pages/product-card';
import { ErrorIndicator } from '../../pages/error-indicator';
import { userIsAuth } from '../../store/actions';

import './app.scss';

const App = ({ userIsAuth }) => {
  useEffect(() => {
    userIsAuth();
  }, []);

  return (
    <div className={'app'}>
      <div className={'wrapper'}>
        <Switch>
{/*          <Route path={'/'} component={ProductList} exact />
          <Route path={'/main'} component={Main} exact />
          <Route path={'/property-list'} component={PropertyList} />*/}
          <Route path={'/add-property'} component={AddPropertyContainer} />
          <Route path={'/item-card/:id'} component={ProductCardContainer} />
          <Route path={'/add-item/:id?'} component={AddItemContainer} />
          <Route path={'/login'} component={LoginContainer} />
          <Route path={'/registration'} component={RegistrationContainer} />
          <Route path={'/'} component={MainContainer}/>
{/*          <Route render={() => <ErrorIndicator />} />*/}
          {/* Switch перекинет на страницу с ошибкой, если ввести несуществующий адрес*/}
        </Switch>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  userIsAuth
};

export default connect(null, mapDispatchToProps)(App);
