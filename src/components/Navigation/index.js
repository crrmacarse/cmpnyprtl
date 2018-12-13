import React from 'react';
import propTypes from 'prop-types';

import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

import { SignInDialog } from '../Validation';
import MenuToggle from './menutoggle';

import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ToolTip from '@material-ui/core/Tooltip';

import HomeIcon from '@material-ui/icons/HomeRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ReorderIcon from '@material-ui/icons/Reorder';
import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/AssessmentRounded';
import AssignmentIcon from '@material-ui/icons/AssignmentRounded';
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayRounded';
import ContactSupportIcon from '@material-ui/icons/ContactSupportRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

const styles = theme => ({
    root: {
        width: '100%',
    },
    list: {
        width: 75,
    },
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.10),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
        fontSize: 14
    },
});


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
            <nav className="navbar navbar-expand-md fixed-top py-0 bg-info navbar-dark">
                <ToolTip title="You need to sign-in first" aria-label="You need to sign-in first">
                    <Link
                        to={'/'}
                        className="navbar-brand p-0 mx-md-2 mb-1"
                        onDoubleClick={this.openSignin}
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
                    | <ToolTip title="Content Management System Plus" aria-label="Content Management System Plus">
                        <span
                            className="font-weight-light mx-2 text-light ml-1"
                            style={{ letterSpacing: '3px', cursor: 'default' }}>
                            cms+
                        </span>
                    </ToolTip>
                </div>
                {/* TODO: Remove dropdown function on mobile. remain toggable searchbar & account(hide others parts here in bottom or idk) */}
                <button className="navbar-toggler btn btn-link border-0 text-white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <ReorderIcon />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <SearchbarWrapped />
                        </li>
                        <li className="nav-item">
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
                        <li className="nav-item">
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
                </div>
                <SideDrawerWrapped left={this.state.left} toggleDrawer={this.toggleDrawer} />
                <SignInDialog open={this.state.signinOpen} closeSignin={this.closeSignin} />
            </nav >
        )
    }
}


// FIX: it can be optimized by passing navigation main to sub components the needed css class.
//  then seperate for readability
const SearchBar = ({ classes }) =>
    <React.Fragment>
        <div className={classes.grow} />
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
        </div>
    </React.Fragment>

const SideDrawer = ({ classes, left, toggleDrawer }) => {
    const sideList = (
        <div className={classes.list}>
            <List>
                <ListItem>
                    <Link to={`/`}>
                        <ToolTip title="Content Management System" aria-label="Content Management System">
                            <ListItemIcon>
                                <OfflineBoltIcon
                                    color="primary"
                                />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <Divider />
                <ListItem>
                    <Link to={`/home`}>
                        <ToolTip title="Home" aria-label="Home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={`/manage`}>
                        <ToolTip title="Manage Assesment" aria-label="Manage Assesment">
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/signup'}>
                        <ToolTip title="Manage Assignment" aria-label="Manage Assignment">
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <ToolTip title="Manage Schedule" aria-label="Manage Schedule">
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                    </ToolTip>
                </ListItem>
                <ListItem>
                    <ToolTip title="Content Management System" aria-label="Content Management System">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                    </ToolTip>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer open={left} onClose={toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleDrawer('left', false)}
                    onKeyDown={toggleDrawer('left', false)}
                >
                    {sideList}
                </div>
            </Drawer>
        </div>
    )
}


SearchBar.propTypes = {
    classes: propTypes.object.isRequired
}

SideDrawer.propTypes = {
    classes: propTypes.object.isRequired,
    left: propTypes.bool.isRequired,
    toggleDrawer: propTypes.func.isRequired,
}

const SearchbarWrapped = compose(
    withStyles(styles)
)(SearchBar);

const SideDrawerWrapped = compose(
    withStyles(styles)
)(SideDrawer)


export default NavigationPage;

export { SearchbarWrapped, SideDrawerWrapped };

