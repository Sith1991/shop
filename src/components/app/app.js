import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MainContainer } from '../../pages/main';
import { LoginContainer } from '../../pages/login';
import { RegistrationContainer } from '../../pages/registration';
import { AddPropertyContainer } from '../../pages/add-property';
import { AddItemContainer } from '../../pages/add-item';
import { ProductCardContainer } from '../../pages/product-card';
import { ErrorIndicator } from '../../pages/error-indicator';

import './app.scss';

const App = () => {
  return (
    <div className={'app'}>
      <div className={'wrapper'}>
        <Switch>
          <Route path={'/'} component={MainContainer} exact />
          <Route path={'/property-list'} component={MainContainer} />
          <Route path={'/add-property'} component={AddPropertyContainer} />
          <Route path={'/item-card/:id'} component={ProductCardContainer} />
          <Route path={'/add-item/:id?'} component={AddItemContainer} />
          <Route path={'/login'} component={LoginContainer} />
          <Route path={'/registration'} component={RegistrationContainer} />
          <Route render={() => <ErrorIndicator />} />
        </Switch>
      </div>
    </div>
  );
};

export { App };
