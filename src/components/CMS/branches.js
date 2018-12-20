import React from 'react';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';

const INITIAL_STATE = {
    name: '',
    address: '',
    coordX: '',
    coordY: '',
    type: '',
    whoedit: '',
    lastedit: '',
    loading: true
}

const ManageBranchPage = () =>
    <div className="row">
        <div className="col-md-12 col-12">
            <ManageBranchForm />
        </div>
    </div>

class ManageBranchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        }
    }

    onSubmit = event => {
        console.log('submitted');

        event.preventDefault();
    }

    render() {

        const { name, address, coordX, coordY, type, whoedit, lastedit } = this.state;

        const isInvalid = name === '' || address === '' || coordX === '' || coordY === '' || type === '' ||
            whoedit === '' || lastedit === ''

        return (
            <form onSubmit={this.onSubmit} className="mt-5">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id='name'
                        name="name"
                        placeholder="Name"
                        required />
                </div>
                <div className = "form-group">
                    <button className = "btn btn-info" type = "button">Pick Location</button>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Address</label>
                    <input
                        className="form-control"
                        type="text"
                        id='name'
                        name="name"
                        placeholder="Complete Address" />
                        <small className = "form-text text-muted">Wrong Address? You can change it</small>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id='name'
                        name="name"
                        placeholder="Name" />
                </div>
                <button disabled = {isInvalid} type="submit" className="btn btn-primary mt-5">Submit</button>
            </form>
        )
    }

}

const condition = authUser => !!authUser;

const ManageBranch = compose(
    withAuthorization(condition)
)(ManageBranchPage)

export default ManageBranch;