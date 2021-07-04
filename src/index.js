import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../src/store/store';
import {ErrorBoundary} from './components/error-boundary';
import { App } from './components/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationsContainer from './components/notifications/notifications-container';

ReactDOM.render(
  <Provider store={store}>
    {/*Предоставляет доступ к Redux Store*/}
    <ErrorBoundary>
      {/*Обработка ошибок в компонентах ниже*/}
      <HashRouter>
        <NotificationsContainer />
        <App />
      </HashRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);