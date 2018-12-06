import React from 'react';
import propTypes from 'prop-types';

import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ReorderIcon from '@material-ui/icons/Reorder';
import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ContactSupportIcon from '@material-ui/icons/ContactSupportRounded';

class NavigationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: false,
        }
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
                <a
                    className="navbar-brand p-0 mx-md-2 mb-1"
                    href="/"
                    onMouseEnter={this.openDrawer}
                    onClick={this.openDrawer}
                >
                    <OfflineBoltIcon />
                </a>
                <div className="nav-item mr-auto text-secondary font-weight-normal ml-md-1">
                    | <span 
                    className="font-weight-light mx-1 text-light ml-1" 
                    title = "Content Management System Plus"
                    style = {{letterSpacing: '3px', cursor: 'default'}}>
                    cms+
                    </span>
                </div>
                <button className="navbar-toggler btn btn-link border-0 text-white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <ReorderIcon />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <SearchbarWrapped />
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 text-dark"
                                title="Open Source!">
                                <CodeIcon />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 text-dark"
                                title="Contact MIS Department">
                                <ContactSupportIcon />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"  
                                rel="noopener noreferrer"
                                className="nav-link py-md-1 text-dark"
                                title="Waffle Time Group of Companies">
                                {this.state.left
                                    ? <ExitToAppIcon />
                                    : <AccountCircleIcon />
                                }

                            </a>
                        </li>
                    </ul>
                </div>
                <SideDrawerWrapped left={this.state.left} toggleDrawer={this.toggleDrawer} />
            </nav>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    list: {
        width: 75,
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
                    <ListItemIcon><MailIcon /></ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemIcon><MailIcon /></ListItemIcon>
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

