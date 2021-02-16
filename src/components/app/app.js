import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {HomePage, PropertyPage} from "../pages";
import ProductCard from "../product-card";
import AddItemPage from "../pages/add-item-page";
import Login from "../login";
import Registration from "../registration";
import AddProperty from "../add-property";

import './app.scss';

const App = () => {

    return (
        <div className={'app'}>
            <div className={'wrapper'}>
                <Switch>
                    <Route path={'/'}
                           component={HomePage}
                           exact/>

                    <Route path={'/property-list'}
                           component={PropertyPage}/>
                    <Route path={'/add-property'}
                           component={AddProperty}/>
                    <Route path={'/item-card/:id'}
                           component={ProductCard}/>
                    <Route path={'/add-item'}
                           component={AddItemPage}/>
                    <Route path={'/login'}
                           component={Login}/>
                    <Route path={'/registration'}
                           component={Registration}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;