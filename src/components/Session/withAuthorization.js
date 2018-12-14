import React from 'react';

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import AuthUserContext from './context';

import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.LANDING);
                        // TODO: I can't add a snackbar('you need to sign--in first' ) here due to => signout event. this triggers
                        // together with 'sign-out succesfully'
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(withAuthorization);
};

export default withAuthorization;