import React from 'react';
import propTypes from 'prop-types';

import {
    Route,
    Link
} from 'react-router-dom';
import { withAuthorization } from '../Session';

import ManageMain from './main';
import ManageItems from './items';

import DashboardIcon from '@material-ui/icons/DashboardRounded';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectoryRounded';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

// TODO: Manage Component

class ManagePage extends React.Component {
    state = {
        activeLink: 'Dashboard'
    }

    handleLinkClick = event => {
        this.setState({ activeLink: event.currentTarget.name });
    }

    render() {
        const { match } = this.props;

        return (
            <section id="manage-section" className="container-fluid bg-white">
                <nav className="nav flex-column bg-dark pt-md-1 pt-2">
                    <Link to={`${match.path}/`} name="Dashboard" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (this.state.activeLink === 'Dashboard' && 'text-white')}>
                            <DashboardIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/branches`} name="Branches" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (this.state.activeLink === 'Branches' && 'text-white')}>
                            <StoreMallDirectoryIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/items`} name="Items" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (this.state.activeLink === 'Items' && 'text-white')}>
                            <ShoppingBasketIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/accounts`} name="Accounts" onClick={this.handleLinkClick}>
                        <span className={"nav-link " + (this.state.activeLink === 'Accounts' && 'text-white')}>
                            <SupervisedUserCircleIcon />
                        </span>
                    </Link>
                    <Link to={`${match.path}/settings`} name="Settings" onClick={this.handleLinkClick}>
                        <span className={"nav-link fixed-bottom " + (this.state.activeLink === 'Settings' && 'text-white')}>
                            <SettingsIcon />
                        </span>
                    </Link>
                </nav>
                <div className="ml-5 text-dark pb-5">
                    {/* <Route exact path={`${match.path}/`} component={ManageMain} /> */}
                    <Route path={`${match.path}/items`} component={ManageMain} />
                    <Route path={`${match.path}/branches`} component={ManageItems} />
                </div>
            </section>
        )
    }
}

ManagePage.propTypes = {
    match: propTypes.object.isRequired
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ManagePage);