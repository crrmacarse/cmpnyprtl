import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    }
})

const randomArrString = [ 
    'Loading...',
    'Processing...',
    'Wait a minute kapeng mainit',
    'Hulat lang bi',
    'Dali lang gd. ga load pa',
    'Hinay hinay lang bi gha',
    'ARI NA',
    'Dasig man lang ni. wait.',
    'Ano gna dala mo man!??',
    'Wait lang gd ha?? ga dali kgd dabi',
    'DI KA PALANGGA SG NANAY MO',
    'May ga palangga pa simo ah. Di mag kabalaka',
    '👻',
    'follow me on twitter @pablongbuhaymo'
]

const Loading = ({ classes, size, enqueueSnackbar }) =>
    <React.Fragment>
        <div 
            className="align-items-center loading" 
            title ="Processing.."
            onClick = {() => {
               enqueueSnackbar(randomArrString[Math.floor(Math.random() * randomArrString.length)]);
            }}
            >
            <CircularProgress color="inherit" size={size} className={classes.progress} />
        </div>
    </React.Fragment>

Loading.prototype = {
    classes: PropTypes.object.isRequired
}

const LoadingWrapped = compose(
    withStyles(styles),
    withSnackbar
)(Loading);

export default LoadingWrapped;
