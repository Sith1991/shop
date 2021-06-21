import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from "../login/login-Container";
import RegistrationContainer from "../registration/registration-Container";
import ProductList from "../product-list";
import PropertyList from "../property-list";
import AddPropertyContainer from "../add-property/add-property-Container";
import AddItemContainer from "../add-item/add-item-Container";
import ProductCardContainer from "../product-card/product-card-Container";
import ErrorIndicator from "../error-indicator";

import './app.scss';

const App = () => {

    return (
        <div className={'app'}>
            <div className={'wrapper'}>
                <Switch>
                    <Route path={'/'}
                           component={ProductList}
                           exact/>
                    <Route path={'/property-list'}
                           component={PropertyList}/>
                    <Route path={'/add-property'}
                           component={AddPropertyContainer}/>
                    <Route path={'/item-card/:id'}
                           component={ProductCardContainer}/>
                    <Route path={'/add-item/:id?'}
                           component={AddItemContainer}/>
                    <Route path={'/login'}
                           component={LoginContainer}/>
                    <Route path={'/registration'}
                           component={RegistrationContainer}/>
                    <Route render={ () => <ErrorIndicator /> } />       {/* Switch перекинет на страницу с ошибкой, если
                                                                            ввести несуществующий адрес*/}
                </Switch>
            </div>
        </div>
    )
}

export default App;