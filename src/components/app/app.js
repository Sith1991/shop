import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {HomePage, PropertyPage} from "../pages";

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
            </Switch>
        </div>
    )
}

export default App;