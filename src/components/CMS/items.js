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

            const itemList = Object.keys(listObject || {}).map(key => ({
                ...listObject[key],
                id: key,
            }))

            this.setState({
                items: itemList,
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
        const { name, type, price, items, loading } = this.state;
        const { businessunit } = this.props;

        return (
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
                {loading && <Loading />}
                <ul>
                    {items.map(item => (

                        <li key = {item.id}>
                            <b> name:</b> {item.name}, 
                            <b> type:</b> {item.type}, 
                            <b> price:</b> {item.price}
                            <b> is fom:</b> {String(item.fom)}
                        </li>
                    ))}
                </ul>

            </form>
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


