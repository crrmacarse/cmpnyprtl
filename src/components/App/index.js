import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { withAuthentication } from '../Session';

import NavigationPage from '../Navigation';
import CMSPage from '../CMS';
import LandingPage from '../Landing';
import { SignUpPage } from '../Validation';
import HomePage from '../Home';
import APIPage from '../API';
import CalendarPage from '../Calendar';

import * as ROUTES from '../../constants/routes';

const App = () =>
    <Router basename={'/portal'}>
        <React.Fragment>
                <NavigationPage />
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.CMS} component={CMSPage} />
                    <Route exact path={ROUTES.SIGNUP} component={SignUpPage} />
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route exact path = { ROUTES.API } component = {APIPage} />
                    <Route exact path = { ROUTES.CALENDAR } component = {CalendarPage} />
                </Switch>
        </React.Fragment>
    </Router>

export default withAuthentication(App);
