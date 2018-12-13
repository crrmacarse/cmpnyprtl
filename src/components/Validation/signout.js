import React from 'react';

import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { withFirebase } from '../Firebase';

import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';

class SignOutButton extends React.Component {

  signOutClicked = () =>{
    this.props.firebase 
      .doSignOut()
      .then((() =>{
        this.props.enqueueSnackbar('Signed out succesfully', {variant: 'info'});
      }))
  }

  render(){
    return (
      <span
        title="Sign-Out"
        onClick={this.signOutClicked}
        className = "text-dark"
        style={{ cursor: 'pointer' }}>
        <ExitToAppIcon /> 
        <p className = "d-inline mx-3 small font-weight-light">Sign Out</p>
    </span>
    )
  }
}

const SignOut = compose(
  withFirebase,
  withSnackbar
)(SignOutButton);

export default SignOut;