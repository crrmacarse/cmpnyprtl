import React from 'react';

import { withFirebase } from '../Firebase';

import { withAuthentication, withAuthorization } from '../Session';

const HomePage = () => (
    <div className="container bg-light">
        <p className="text-center display-1">
            Hello
        </p>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);