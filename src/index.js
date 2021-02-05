import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../src/store/store';
import ErrorBoundry from './components/error-boundry';
import App from './components/app';
import {ShopstoreServiceProvider} from './services/shopstore-service-context';
import ShopstoreService from './services/shopstore-service';
import 'bootstrap/dist/css/bootstrap.min.css';

const shopstoreService = new ShopstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>  {/*сработает если из стора придет ошибка*/}
            <ShopstoreServiceProvider value={shopstoreService}>
                <Router>
                    <App/>
                </Router>
            </ShopstoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)