import React from 'react';

import { withFirebase } from '../Firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

const SignOutButton = ({ firebase }) => (
  <a
    className="nav-link py-md-1 text-dark"
    title="Sign-Out"
    onClick={firebase.doSignOut}
    style={{ cursor: 'pointer' }}>
    <AccountCircleIcon />
  </a>
);

export default withFirebase(SignOutButton);