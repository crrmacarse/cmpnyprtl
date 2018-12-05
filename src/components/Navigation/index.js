import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ReorderIcon from '@material-ui/icons/Reorder';
import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

class NavigationPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            left: false,
        }
    }

    mouseEnter = event => {
        this.setState(prevState => ({
            left: !prevState.left
        })
    )}

    mouseLeave = event => {
        this.setState(prevState => ({
            left: !prevState.left
        })
    )}

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        })
    }

    render(){
        return(
        <nav className="navbar navbar-expand-md fixed-top py-0 bg-info navbar-dark">
                <a className="navbar-brand p-0 mx-md-2 mb-1" href="#" onMouseEnter = {this.mouseEnter} >
                    <OfflineBoltIcon />
                </a>
                <div className="nav-item mr-auto text-secondary font-weight-normal ml-md-1">
                    | <span className="font-weight-light mx-1 text-light ml-1">cms+</span>
                </div>
                <button className="navbar-toggler btn btn-link border-0 text-white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <ReorderIcon />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                className="nav-link py-md-1 text-light"
                                title="Open Source!">
                                <CodeIcon />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="https://github.com/crrmacarse/cmsx"
                                target="_blank"
                                className="nav-link py-md-1 text-light"
                                title="Waffle Time Group of Companies">
                                <span className="small">wtgoc</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <SearchbarWrapped />
                        </li>
                    </ul>
                </div>
                <SideDrawerWrapped left = {this.state.left} toggleDrawer = { this.toggleDrawer } />
            </nav>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    list: {
        width: 200,
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

class SearchBar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
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
        )
    }
}

class SideDrawer extends React.Component {

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
                <Drawer open={this.props.left} onClose={this.props.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer('left', false)}
                        onKeyDown={this.props.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        )
    }
}

SearchBar.PropTypes = {
    classes: PropTypes.object.isRequired,
}

const SearchbarWrapped = compose(
    withStyles(styles)
)(SearchBar);

const SideDrawerWrapped = compose(
    withStyles(styles)
)(SideDrawer)

export default NavigationPage;

export { SearchbarWrapped, SideDrawerWrapped };

