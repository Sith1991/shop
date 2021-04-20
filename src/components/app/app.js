import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductCard from "../product-card";
import Login from "../login";
import Registration from "../registration";
import ProductList from "../product-list";
import PropertyList from "../property-list";
import AddPropertyContainer from "../add-property/add-property-Container";
import AddItemContainer from "../add-item/add-item-Container";

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
                           component={ProductCard}/>
                    <Route path={'/add-item'}
                           component={AddItemContainer}/>
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