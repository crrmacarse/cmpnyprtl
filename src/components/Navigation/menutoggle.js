import React from 'react';

import { withAuthorization } from '../Session';

import SIgnOutButton from '../Validation/signout';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ToolTip from '@material-ui/core/Tooltip';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import AspectRatioIcon from '@material-ui/icons/AspectRatioRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';


class MenuToggle extends React.Component {
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <React.Fragment>
                <ToolTip title="Account" aria-label="Account">
                    <span
                        className="nav-link py-md-1 waffletime-yellow"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        onClick={this.handleClick}
                        aria-haspopup="true"
                        style={{ cursor: 'pointer' }}
                    ><AccountCircleIcon /></span>
                </ToolTip>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <span className="text-dark">
                            <AccountCircleIcon />
                            <p className="d-inline mx-3 small font-weight-bold">Account</p>
                        </span>
                    </MenuItem>

                    <MenuItem onClick={this.handleClose}>
                        <span className="text-dark">
                            <AspectRatioIcon />
                            <p className="d-inline mx-3 small font-weight-bold">Preference</p>
                        </span>
                    </MenuItem>

                    <MenuItem onClick={this.handleClose}>
                        <span className="text-dark">
                            <SettingsIcon />
                            <p className="d-inline mx-3 small font-weight-bold">Settings</p>
                        </span>
                    </MenuItem>

                    <MenuItem onClick={this.handleClose}>
                        <SIgnOutButton />
                    </MenuItem>
                </Menu>
            </React.Fragment >
        )
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(MenuToggle);