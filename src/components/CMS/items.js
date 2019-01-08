import React from 'react';
import propTypes from 'prop-types';

import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { withSnackbar } from 'notistack';

import { Loading } from '../Include';

// FIX: reproduce => click item page => hit refresh => highlights dashboard instead of item(it refreshes the state)

const INITIAL_STATE = {
    name: '',
    type: '',
    price: '',
    fom: false,
}

const ItemPage = ({ businessunit }) =>
    <div>
        {businessunit
            ? (<ItemFormWrapped businessunit={businessunit} />)
            : 'please select a business unit'
        }
    </div>


class ItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
            loading: false,
            items: [],
            header: [],
        }
    }

    onSubmit = event => {
        /*
            FiX: idk why this is on top. bcos my standard of approach is event.preventDefault() 
            must be on bottom. noted to check and test

            FIX: doCreateItem() duplicate approach in ./firebase class. doCreateItem can be eliminated

        */
        event.preventDefault();
        const { name, type, price, fom } = this.state;
        const { businessunit, enqueueSnackbar } = this.props;

        this.props.firebase
            .doCreateItem(businessunit)
            .push({
                name: name,
                type: type,
                price: price,
                fom: fom
            })
            .then(() => {
                this.setState({
                    ...INITIAL_STATE
                })
                enqueueSnackbar('Added Succesfully', { variant: 'success' });
            })
            .catch(error => {
                enqueueSnackbar(error.message, { variant: 'warning' });
            })
    }

    componentDidMount() {
        const { businessunit } = this.props;

        this.setState({ loading: true });

        this.props.firebase.items(businessunit).on('value', snapshot => {
            const listObject = snapshot.val();

            // listObject || {} gives a null value to prevent error if firebase response is null

            const itemList = Object.keys(listObject || {}).map(key => ({
                ...listObject[key],
                id: key,
            }))

            /*
                item header is alr dynamic but the problem is firebase makes the its input alphabetically ordered.
                probably the best way is to make a man in the middle between so it can sort out the problem with firebase

            */

            // const itemHeader = Object.keys(itemList[0]).map(key => ({
            //     header: key
            // }))

            this.setState({
                items: itemList,
                // header: itemHeader,
                loading: false
            })

        })

    }

    componentWillUnmount() {
        this.props.firebase.items().off();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { name, type, price, items, loading, header } = this.state;
        const { businessunit } = this.props;

        return (
            <div className="row">
                <div className="col-12 col-md-12 py-2">
                    <div className="d-flex flex-row-reverse my-2">
                        <div className="btn-group dropright">
                            <button 
                                className="btn btn-info btn-sm dropdown-toggle" 
                                type="button" data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                Actions
                            </button>
                            <div className="dropdown-menu">
                                <button className="dropdown-item btn-sm" type="button">New</button>
                                <button className="dropdown-item btn-sm" type="button">Report</button>
                            </div>
                        </div>
                        <div className="col-2 pr-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Search.." />
                        </div>
                    </div>
                    {loading && <Loading />}
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead >
                                <tr>
                                    {/* {header.map(item => (
                               <th scope="col">{item.header}</th>
                            ))
                            } */}

                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">FOM</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.name}</th>
                                        <td>{item.type}</td>
                                        <td>{item.price}</td>
                                        <td>{String(item.fom)}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-primary mx-1">Update</button>
                                                <button type="button" className="btn btn-sm btn-danger mx-1">Delete</button>
                                                <button type="button" className="btn btn-sm btn-warning mx-1">Flag This</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <h3>business unit for: {businessunit}</h3>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            required
                            onChange={this.onChange}
                            value={name}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="type"
                            name="type"
                            required
                            onChange={this.onChange}
                            value={type}
                        />
                        <br />
                        <input
                            type="number"
                            placeholder="price"
                            name="price"
                            value={price}
                            onChange={this.onChange}
                            required
                        />
                        <br />
                        <input
                            type="checkbox"
                            name="fom"
                            value="true"
                            onChange={this.onChange}
                        /> Flavor of the Month?
                         <hr />
                        <button type="submit">Submit</button>
                        <hr />

                    </form >
                </div>
            </div>
        )
    }
}

ItemPage.propTypes = {
    businessunit: propTypes.string
}

ItemForm.propTypes = {
    businessunit: propTypes.string
}

const condition = authUser => !!authUser;

const ItemFormWrapped = compose(
    withAuthorization(condition),
    withSnackbar
)(ItemForm)

const ItemPageWrapped = compose(
    withAuthorization(condition),
    withSnackbar
)(ItemPage)

export default ItemPageWrapped;


