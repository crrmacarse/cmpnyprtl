import React from 'react';

import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { withAuthorization } from '../Session';

import Loading from '../Include/loading';

class ManageItemsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: false,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12 col-12">
                    <div className="text-dark">
                        <h1 className="display-4">Items</h1>
                        <Loading size = {30}/>
                        <button 
                            type = "button"
                            className = "btn-lg btn-primary btn"
                            onClick = {() => {
                                this.props.enqueueSnackbar('Success', {variant: 'success'});
                            }}
                        >Click for Notifcation
                        </button>

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