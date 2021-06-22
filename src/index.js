import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../src/store/store';
import ErrorBoundry from './components/error-boundry';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationsContainer from "./components/notifications/notifications-Container";

ReactDOM.render(
    <Provider store={store}> {/*Предоставляет доступ к Redux Store*/}
        <ErrorBoundry> {/*Обработка ошибок в компонентах ниже*/}
                <Router>
                    <NotificationsContainer />
                    <App/>
                </Router>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)