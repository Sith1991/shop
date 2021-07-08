import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from '../src/store/store';
import { ErrorBoundary } from './components/error-boundary';
import { AppContainer } from './components/app';
import { NotificationsContainer } from './components/notifications';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    {/*Предоставляет доступ к Redux Store*/}
    <ErrorBoundary>
      {/*Обработка ошибок в компонентах ниже*/}
      <HashRouter>
        <NotificationsContainer />
        <AppContainer />
      </HashRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
