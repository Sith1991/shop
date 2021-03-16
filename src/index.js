import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../src/store/store';
import ErrorBoundry from './components/error-boundry';
import App from './components/app';
import {ShopServiceProvider} from './services/shop-service-context';
import ShopService from './services/shop-service';
import 'bootstrap/dist/css/bootstrap.min.css';

const shopService = new ShopService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>  {/*сработает если из стора придет ошибка*/}
            <ShopServiceProvider value={shopService}>
                <Router>
                    <App/>
                </Router>
            </ShopServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)