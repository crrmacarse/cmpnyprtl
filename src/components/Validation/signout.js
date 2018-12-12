import React from 'react';

import { withFirebase } from '../Firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

const SignOutButton = ({ firebase }) => (
  <span
    className="nav-link py-md-1 text-dark"
    title="Sign-Out"
    onClick={firebase.doSignOut}
    style={{ cursor: 'pointer' }}>
    <AccountCircleIcon />
  </span>
);

export default withFirebase(SignOutButton);