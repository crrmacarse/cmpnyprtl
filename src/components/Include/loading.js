import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    }
})

const Loading = ({ classes, size }) =>
    <React.Fragment>
        <div className="align-items-center">
            <CircularProgress color="inherit" size={size} className={classes.progress} />
        </div>
    </React.Fragment>

Loading.prototype = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading);
