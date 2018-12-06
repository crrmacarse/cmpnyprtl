import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import NavigationPage from '../Navigation';
import LandingPage from '../Landing';

import * as ROUTES from '../../constants/routes';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                  <NavigationPage />
                <Router>
                    <Route exact path={ ROUTES.LANDING } component = { LandingPage } />                    
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
