import React from 'react';

import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withSnackbar } from 'notistack';

import { SignInDialog } from '../Validation';
import MenuToggle from './menutoggle';
import { SideDrawer } from './navs';

import ToolTip from '@material-ui/core/Tooltip';

import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import CodeIcon from '@material-ui/icons/Code';
import ContactSupportIcon from '@material-ui/icons/ContactSupportRounded';

class NavigationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: false,
            signinOpen: false,
        }
    }

    openSignin = () => {
        this.setState({ signinOpen: true });
    };

    closeSignin = () => {
        this.setState({ signinOpen: false });
    }

    openDrawer = event => {
        this.setState(prevState => ({
            left: !prevState.left
        })
        )
        event.preventDefault();
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            left: open,
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top py-0 navbar-dark">
                <ToolTip title="Company Portal" aria-label="Company Portal">
                    <Link
                        to={'/'}
                        className="navbar-brand p-0 mx-md-2 mb-1 text-dark"
                        onDoubleClick={() => {
                            this.props.enqueueSnackbar('You need to Sign-in first', { variant: 'warning' });
                        }}
                    >
                        <AuthUserContext.Consumer>
                            {authUser =>
                                authUser
                                    ? <OfflineBoltIcon onMouseEnter={this.openDrawer}
                                        onClick={this.openDrawer} />
                                    : <OfflineBoltIcon />
                            }
                        </AuthUserContext.Consumer>
                    </Link>
                </ToolTip>
                <div className="nav-item mr-auto text-secondary font-weight-normal ml-md-1">
                    | <ToolTip title="The Waffle Time Group" aria-label="The Waffle Time Group">
                        <span
                            className="font-weight-light mx-2 text-light ml-1 small"
                            style={{ letterSpacing: '1px', cursor: 'default' }}>
                            The Waffle Time Group
                        </span>
                    </ToolTip>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item d-none d-md-inline">
                        <ToolTip title="Talk to the developer 👀" aria-label="Talk to the developer 👀">
                            <a
                                href="https://twitter.com/pablongbuhaymo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 font-weight-normal text-dark">
                                :
                                </a>
                        </ToolTip>
                    </li>
                    <li className="nav-item d-none d-md-inline">
                        <ToolTip title="Open Source!" aria-label="Open Source!">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 text-dark">
                                <CodeIcon />
                            </a>
                        </ToolTip>
                    </li>
                    <li className="nav-item d-none d-md-inline">
                        <ToolTip title="Contact MIS Department" aria-label="Contact MIS Department">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 text-dark">
                                <ContactSupportIcon />
                            </a>
                        </ToolTip>
                    </li>
                    <li className="nav-item">
                        <AuthUserContext.Consumer>
                            {authUser =>
                                authUser
                                    ? <MenuToggle />
                                    : <span
                                        className="nav-link py-md-1 text-dark"
                                        onClick={this.openSignin}
                                        title="Sign-in"
                                        style={{ cursor: 'pointer' }}>
                                        <ExitToAppIcon />
                                    </span>
                            }
                        </AuthUserContext.Consumer>
                    </li>

                </ul>
                <SideDrawer left={this.state.left} toggleDrawer={this.toggleDrawer} />
                <SignInDialog open={this.state.signinOpen} closeSignin={this.closeSignin} />
            </nav >
        )
    }
}

export default withSnackbar(NavigationPage);

