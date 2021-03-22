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
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBqzyhjRSQnQiJdwh2_P2W-wS6XMhowBuI",
    authDomain: "shop-app-firebase.firebaseapp.com",
    databaseURL: "https://shop-app-firebase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-app-firebase",
    storageBucket: "shop-app-firebase.appspot.com",
    messagingSenderId: "159676401640",
    appId: "1:159676401640:web:ef06138de6d79548f6065d"
};

firebase.initializeApp(firebaseConfig);

const shopService = new ShopService();

ReactDOM.render(
    <Provider store={store}> {/*Предоставляет доступ к Redux Store*/}
        <ErrorBoundry> {/*Обработка ошибок в компонентах ниже*/}
            <ShopServiceProvider value={shopService}> {/*Передает service через ContextAPI*/}
                <Router>
                    <App/>
                </Router>
            </ShopServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
)