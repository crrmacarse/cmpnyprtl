import React from 'react';
import propTypes from 'prop-types';

import {
    Route,
    Link
} from 'react-router-dom';
import { withAuthorization } from '../Session';

import CMSManageMain from './main';
import CMSManageItems from './items';
import CMSManageBranches from './branches';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DashboardIcon from '@material-ui/icons/DashboardRounded';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectoryRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

// FIX: Find better approach in toggling

class CMSPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLink: '',
            activeBusinessUnit: null,
            businessUnits: [],
            loading: false,
            anchorEl: null,
        }
    }

    handleLinkClick = event => {
        this.setState({ activeLink: event.currentTarget.name });
    }

    handleMenuClose = event => {
        this.setState({
            anchorEl: null,
            activeBusinessUnit: event.currentTarget.getAttribute('name')
        });

    }

    handleMenuClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleBUClick = event => {
        this.setState({ activeBusinessUnit: event.currentTarget.getAttribute('name') });

        /*
 
        TODO: Click business Unit which would switch the nav from the right. Pass state and func to compopnent
        to handle changes.add a higher order or some kind to filter the switch. the gear button will represent
        the current business unit. u can do it like click of account and pop it out as selectable. but it would
        be hard for me switching it.

        left side nav accepts state change. switch it the desired business unit nav. but how about switching
        in a selected items list?? i should try to change the approach as naked component then pass a list to it
        then render it. but where should i load the item? idfk wtf
        
        */
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.businessUnits().on('value', snapshot => {
            const listObject = snapshot.val();

            const businessUnitList = Object.keys(listObject).map(key => ({
                ...listObject[key],
                uid: key,
            }))

            this.setState({
                businessUnits: businessUnitList,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this.props.firebase.businessUnits().off();
    }

    render() {
        const { activeLink, businessUnits, activeBusinessUnit, loading, anchorEl } = this.state;
        const { match } = this.props;

        const BusinessUnitEl = businessUnits.map((value, i) =>
            <div
                className='col-12 col-md-4 my-2'
                onClick={this.handleBUClick}
                style={{ cursor: 'pointer' }}
                key={i}
                name={value.name}>
                <div className={'card ' + (activeBusinessUnit === `${value.name}` && 'border-primary')}>
                    <div className="card-body">
                        <h5 className="card-title">{value.name}</h5>
                        <h6 className="card-subtitle mb-4 text-muted small">{value.type}</h6>
                        <p className="card-text">{value.description}</p>
                        <a href={value.website} target="_blank" rel="noopener noreferrer" className="card-link">Visit Website</a>
                    </div>
                </div>
            </div>
        )

        const MenuEl =
            <Menu
                id="BUMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
            >
                {businessUnits.map((value, i) =>
                    <MenuItem onClick={this.handleMenuClose} name = {value.name} key={i}>
                        <span className="text-dark" name={value.name}>
                            <p className="d-inline mx-3 small font-weight-bold">{value.name}</p>
                        </span>
                    </MenuItem>
                )}
            </Menu>

        return (
            <section id="manage-section" className="container-fluid bg-white">
                <nav className="nav flex-column bg-dark pt-md-1 pt-2">
                    <Link to={`${match.path}/`} name="Dashboard" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (activeLink === 'Dashboard' && 'text-white')}>
                            <DashboardIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/branches`} name="Branches" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (activeLink === 'Branches' && 'text-white')}>
                            <StoreMallDirectoryIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/items`} name="Items" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (activeLink === 'Items' && 'text-white')}>
                            <ShoppingBasketIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/accounts`} name="Accounts" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (activeLink === 'Accounts' && 'text-white')}>
                            <SupervisedUserCircleIcon />
                        </span>
                    </Link>
                    <span
                        className={"nav-link fixed-bottom text-secondary " + (this.state.activeLink === 'Settings' && 'text-white')}
                        aria-owns={anchorEl ? 'BUMenu' : undefined}
                        onClick={this.handleMenuClick}
                        aria-haspopup="true"
                        style={{ cursor: 'pointer' }}
                    >
                        <SettingsIcon />
                    </span>
                </nav>
                {MenuEl}
                <div className="ml-5 text-dark pb-5">
                    <Route exact path={`${match.path}/`} component={() => <CMSManageMain loading = {loading} BusinessUnitEl={BusinessUnitEl} />} />
                    <Route path={`${match.path}/items`} component={() => <CMSManageItems businessunit={activeBusinessUnit} />} />
                    <Route path={`${match.path}/branches`} component={CMSManageBranches} />
                </div>
            </section>
        )
    }
}

CMSPage.propTypes = {
    match: propTypes.object.isRequired
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CMSPage);