import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {HomePage, PropertyPage} from "../pages";

import './app.css';

const App = () => {
    return (
        <Switch>
            <Route path={'/'}
                   component={HomePage}
                   exact/>

            <Route path={'/all-property'}
                   component={PropertyPage}/>
        </Switch>
    )
}

export default App;