import React, { Component } from 'react';

import { 
    BrowserRouter as Router,
    Link
 } from 'react-router-dom';

import NavigationPage from '../Navigation';

class App extends Component {
    render() {
        return (
            <div className = "container-fluid">
                <NavigationPage />
                <Router>
                    


                </Router>
            </div>
        );
    }
}

export default App;
