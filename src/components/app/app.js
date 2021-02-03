import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {HomePage, PropertyPage} from "../pages";
import ProductCard from "../product-card";
import AddItemPage from "../pages/add-item-page";

import './app.css';

const App = () => {



    return (
        <div className={'wrapper'}>
            <Switch>
                <Route path={'/'}
                       component={HomePage}
                       exact/>

                <Route path={'/property-list'}
                       component={PropertyPage}/>
                <Route path={'/item-card/:id'}
                       component={ProductCard}/>
                <Route path={'/add-item'}
                       component={AddItemPage}/>
            </Switch>
        </div>
    )
}

export default App;