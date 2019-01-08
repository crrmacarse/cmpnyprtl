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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


/*

    This is a messed up shit. BEWARE

*/

const INITIAL_STATE = {
    username: '',
    email: '',
    emailhandler: '',
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
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        minWidth: 130,
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
                return <p className="small">Idk what to put</p>;
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
                <div className="row p-3">
                    <div className="col-md-5 col-12">
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {this.getStepContent(index)}
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    {activeStep < steps.length - 1
                                                        &&

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
                                                                Next
                                                            </Button>
                                                        </div>

                                                    }
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                    <div className="col-md-7 col-12">
                        <p className="h5 font-weight-bold">Disclaimer:</p>
                        <p className="font-weight-light">
                            Integer ornare quam odio, eu ornare nibh mattis cursus. Donec a efficitur mi, sit amet
                            cursus lorem. Cras quis gravida tortor. Proin in turpis vitae lectus lacinia elementum eu
                            in libero. Duis sagittis auctor augue, eget egestas erat efficitur ac. Nam quis justo
                            consectetur justo malesuada volutpat. Fusce ac elementum mi, sed convallis turpis.
                            Mauris eleifend lorem ante, in accumsan magna porta ut. Nam ac congue sapien, at mattis
                            ipsum. Aliquam a porta orci, facilisis facilisis orci. Cras ut scelerisque nulla.
                            Mauris aliquam placerat neque condimentum aliquam. Nulla facilisi. Aenean maximus
                            ut justo et consectetur. Ut hendrerit ex et risus tincidunt interdum.
                        </p>
                        <p className="h5 mt-5 font-weight-bold">Terms and Conditions:</p>
                        <p className="font-weight-light">
                            Mauris et dolor convallis dui scelerisque ultrices. Aenean et ullamcorper urna, a suscipit
                            purus. Proin velit massa, ullamcorper eget tincidunt vel, consectetur vitae dolor. Maecenas
                            nec elit in tellus egestas ultricies vel non turpis. Quisque elementum augue in dapibus laoreet.
                            Donec quam enim, dictum iaculis aliquet sit amet, viverra ac libero.
                        </p>
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

    handleEmailHandlerChange = event => {
        this.setState({
            emailhandler: event.target.value
        })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { username, email, passwordOne, emailhandler } = this.state;
        
        let emailFinal = (email + emailhandler).trim();

        this.props.firebase
            .doCreateUserWithEmailAndPassword(emailFinal, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email : emailFinal,
                    })
            })
            .then(() => {
                this.props.firebase.doSendEmailVerification()
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.enqueueSnackbar("A Verification email was sent to your email account. Kindly check it out!", { variant: 'warning' });
                this.props.enqueueSnackbar('Succesfully registered!', { variant: 'success' });
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
            emailhandler
        } = this.state;

        const { classes } = this.props;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            emailhandler === '';

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
                <div className="m-2 d-flex flex-wrap">
                    <TextField
                        name="email"
                        label="Email"
                        id="idEmail"
                        helperText="Lorem Ipsum Dolor"
                        onChange={this.onChange}
                        value={email}
                    />
                    <FormControl required className = {classes.formControl}>
                        <InputLabel htmlFor="emailhandler-required">Email Handler</InputLabel>
                        <Select
                            native
                            className={classes.selectEmpty}
                            value={emailhandler}
                            name="age"
                            onChange={this.handleEmailHandlerChange}
                            inputProps={{
                                id: 'emailhandler-required',
                            }}
                        >
                            <option value="" />
                            <option value={'@coffeebreak.ph'}>@coffeebreak.ph</option>
                            <option value={'@waffletime.com'}>@waffletime.com</option>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
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
    withStyles(styles),
)(SignUpForm);

export default withStyles(styles)(SignUpPage);

export { SignUpLink };

