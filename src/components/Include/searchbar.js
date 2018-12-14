import React from 'react';
import propTypes from 'prop-types';

import { compose } from 'recompose';
import {withStyles} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    grow: {
        flexGrow: 1,
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

const SearchBarMain = ({ classes }) =>
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

SearchBarMain.propTypes = {
    classes: propTypes.object.isRequired
}

const SearchBar = compose(
    withStyles(styles)
)(SearchBarMain);

export default SearchBar;