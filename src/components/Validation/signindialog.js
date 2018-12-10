import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import { SignUpLink } from './index';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

const styles = theme => ({
    customBTN: {
        color: theme.palette.getContrastText('#fff'),
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#4BB543',
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
})

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class SignInDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        };
    }

    // TODO: Signin paused due to missing authUser. Focus first on creating auth.

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => { })
    }

    render() {
        const { classes, open, handleClose } = this.props;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Enter Credentials
                        </DialogTitle>
                <DialogContent>
                <DialogContentText>      
                        <SignUpLink handleClose = { handleClose }/>
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="username"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                    
                </DialogContent>
                
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        className={classes.customBTN}
                    >
                        <ExitToAppIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Sign-in
                            </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

SignInDialog.propTypes = {
    classes: propTypes.object.isRequired,
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
}

export default withStyles(styles)(SignInDialog);