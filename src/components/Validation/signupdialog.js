import React from 'react';

import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignUpPage extends React.Component {

    // TODO: Sign up functions
    render() {

        return (
            <section className="container-fluid h-100 bg-white text-dark">
                <div className="row py-5 bg-white">
                    <div className="col-md-5 col-12 ml-md-5">
                        <p className="h2 font-weight-bold">
                            Sign Up
                        </p>
                        <div className="m-2">
                            <TextField
                                name="username"
                                label="Username"
                                id="idUsername"
                                autoComplete="username"
                                fullWidth
                            />
                        </div>
                        <div className="m-2">
                            <TextField
                                name="email"
                                label="Email"
                                onChange={this.onChange}
                                id="idEmail"
                                fullWidth
                                helperText="Lorem Ipsum Dolor"
                            />
                        </div>
                        <div className="m-2">
                            <TextField
                                name="passwordOne"
                                label="Password"
                                type="password"
                                onChange={this.onChange}
                                id="idPassword1"
                                autoComplete="new-password"
                                fullWidth
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
                            />
                        </div>

                        <div className="mt-5">
                            <Button
                                // disabled={isInvalid}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >Sign up</Button>
                        </div>

                    </div>
                    <div className="col">

                    </div>
                    <div className="col-md-5 col-12 mt-md-0 mt-5 ml-md-5">
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
                    </div>
                </div>
            </section>
        )
    }

}


const SignUpLink = ({ handleClose }) => {
    return (
        <React.Fragment>
            Don't have an account yet? <Link to={ROUTES.SIGNUP} onClick = {handleClose} > Sign Up here</Link>
        </React.Fragment>
    )
}

export default SignUpPage;

export { SignUpLink };

