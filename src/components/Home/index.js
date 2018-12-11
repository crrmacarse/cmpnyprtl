import React from 'react';

import { withFirebase } from '../Firebase';

const SomeComponent = () => (
    <div className="container bg-light">
        <p className="text-center display-1">
            Hello
        </p>
    </div>
);

export default withFirebase(SomeComponent);