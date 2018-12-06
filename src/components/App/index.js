import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NavigationPage from '../Navigation';
import ManagePage from '../Manage';
import LandingPage from '../Landing';

import * as ROUTES from '../../constants/routes';

const App = () =>
    <Router>
        <React.Fragment>
            <NavigationPage />
            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.MANAGE} component={ManagePage} />
            </Switch>
        </React.Fragment>
    </Router>

export default App;
