import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';

import * as ROUTES from '../../constants/routes';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
};

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

class SignUpPage extends React.Component {
    state = {
        activeStep: 0,
        checked: false,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleChange = name => event => {
        this.setState({ checked: event.target.checked });
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checkedB}
                            onChange={this.handleChange('checkedB')}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    label="I am an employee"
                />;
            case 1:
                return <p className = "small">Idk what to put</p>;
            case 2:
                return <SignUpFormWrapped />;
            default:
                return 'Unknown step';
        }
    }

    // TODO: Fix dis shit. move sign up form to left

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        const steps = ['Are you an employee of this company?', 'Accept Terms and Agreements', 'Sign up']

        return (
            <section className="container-fluid h-100 text-dark">
                <div className="row">
                    <div className="col-md-5 col-12 ml-md-5">
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {this.getStepContent(index)}
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    Reset
              </Button>
                            </Paper>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}



class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
            activeStep: 0,
            checked: false,
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.enqueueSnackbar('Succesfully registered', { variant: 'success' });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.props.enqueueSnackbar(error.message, { variant: 'error' });
            });

        event.preventDefault();

    }

    render() {

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <p className="h2 font-weight-bold mb-2">
                    Sign Up
                        </p>
                <div className="m-2">
                    <TextField
                        name="username"
                        label="Username"
                        id="idUsername"
                        autoComplete="username"
                        fullWidth
                        onChange={this.onChange}
                        value={username}
                    />
                </div>
                <div className="m-2">
                    <TextField
                        name="email"
                        label="Email"
                        id="idEmail"
                        fullWidth
                        helperText="Lorem Ipsum Dolor"
                        onChange={this.onChange}
                        value={email}
                    />
                </div>
                <div className="m-2">
                    <TextField
                        name="passwordOne"
                        label="Password"
                        type="password"
                        id="idPassword1"
                        autoComplete="new-password"
                        fullWidth
                        onChange={this.onChange}
                        value={passwordOne}
                    />
                </div>
                <div className="m-2">
                    <TextField
                        name="passwordTwo"
                        label="Confirm Password"
                        type="password"
                        id="idPassword2"
                        autoComplete="new-password"
                        fullWidth
                        helperText="Confirm Password"
                        onChange={this.onChange}
                        value={passwordTwo}
                    />
                </div>

                <div className="mt-5">
                    <Button
                        disabled={isInvalid}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Sign up</Button>
                </div>
            </form>
        )
    }

}


const SignUpLink = ({ handleClose }) => {
    return (
        <React.Fragment>
            Don't have an account yet? <Link to={ROUTES.SIGNUP} onClick={handleClose} > Sign Up here</Link>
        </React.Fragment>
    )
}

SignUpPage.propTypes = {
    classes: PropTypes.object,
};

const SignUpFormWrapped = compose(
    withFirebase,
    withRouter,
    withSnackbar,
)(SignUpForm);

export default withStyles(styles)(SignUpPage);

export { SignUpLink };

