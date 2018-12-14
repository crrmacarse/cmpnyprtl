import React from 'react';

import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { withAuthorization } from '../Session';

import { Loading } from '../Include';

import * as ROUTES from '../../constants/routes';

// TODO: Implement Table add / display

class ManageItemsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

    }

    componentWillUnmount() {

    }

    render() {
        const { loading } = this.state;

        return (
            <div className="row text-dark">
                <div className="col-12">
                    <p className="h2 font-weight-light">
                        Nunc at lectus neque <span className="h3 text-secondary font-weight-bold" onClick = {
                            () => {
                                this.props.history.push(ROUTES.LANDING);
                            }
                        }>(55)</span>
                    </p>
                    <div className="text-dark">
                    {loading && <React.Fragment><Loading /></React.Fragment>}

                    </div>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

const ManageItems = compose(
    withAuthorization(condition),
    withSnackbar,
)(ManageItemsPage);


export default ManageItems;