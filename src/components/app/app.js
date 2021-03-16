import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductCard from "../product-card";
import AddItem from "../add-item";
import Login from "../login";
import Registration from "../registration";
import AddProperty from "../add-property";
import ProductList from "../product-list";
import PropertyList from "../property-list";
import withShopService from "../../hoc";

import './app.scss';

const App = ({shopService}) => {
    console.log(shopService.getItems());
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
                           component={AddProperty}/>
                    <Route path={'/item-card/:id'}
                           component={ProductCard}/>
                    <Route path={'/add-item'}
                           component={AddItem}/>
                    <Route path={'/login'}
                           component={Login}/>
                    <Route path={'/registration'}
                           component={Registration}/>
                </Switch>
            </div>
        </div>
    )
}

export default withShopService()(App);