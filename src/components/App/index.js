import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NavigationPage from '../Navigation';
import ManagePage from '../Manage';
import LandingPage from '../Landing';
import { SignUpPage } from '../Validation';
import HomePage from '../Home';

import * as ROUTES from '../../constants/routes';

const App = () =>
    <Router basename={'/cms'}>
        <React.Fragment>
            <NavigationPage />
            <Switch>
                <Route exact path={ ROUTES.LANDING } component={ LandingPage } />
                <Route path={ ROUTES.MANAGE } component={ ManagePage } />
                <Route exacth path = { ROUTES.SIGNUP } component = { SignUpPage } />
                <Route exact path = { ROUTES.HOME } component = { HomePage } />
            </Switch>
        </React.Fragment>
    </Router>

export default App;
