import React from 'react';
import propTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ToolTip from '@material-ui/core/Tooltip';

import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import HomeIcon from '@material-ui/icons/HomeRounded';
import AssessmentIcon from '@material-ui/icons/AssessmentRounded';
import AssignmentIcon from '@material-ui/icons/AssignmentRounded';
import CalendarTodayIcon from '@material-ui/icons/CalendarTodayRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import EmailIconRounded from '@material-ui/icons/EmailRounded';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderModeRounded';
import CloudIcon from '@material-ui/icons/CloudRounded';
import FingerPrintIcon from '@material-ui/icons/FingerprintRounded';

const styles = theme => ({
    mainIcon: {
        color: '#32a5fd',
        '&:hover': {
            color: '#fa0002',
        }
    },
    list: {
        width: 75,
    }
});

const SideDrawerMain = ({ classes, left, toggleDrawer }) => {
    const sideList = (
        <div className={classes.list}>
            <List>
                <ListItem>
                    <Link to={`/`}>
                        <ToolTip title="The Waffle Time Group" aria-label="The Waffle Time Group">
                            <ListItemIcon>
                                <OfflineBoltIcon
                                    className={classes.mainIcon}
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
                    <Link to={'/message'}>
                        <ToolTip title="Email" aria-label="Email">
                            <ListItemIcon>
                                <EmailIconRounded />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={`/reports`}>
                        <ToolTip title="Reports" aria-label="Reports">
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={`/cms`}>
                        <ToolTip title="Content Management System" aria-label="Content Management System">
                            <ListItemIcon>
                                <ChromeReaderModeIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/signup'}>
                        <ToolTip title="Assignments" aria-label="Assignments">
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/storage'}>
                        <ToolTip title="Cloud Storage" aria-label="Cloud Storage">
                            <ListItemIcon>
                                <CloudIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/calendar'}>
                        <ToolTip title="Calendar of Activities" aria-label="Calendar of Activities">
                            <ListItemIcon>
                                <CalendarTodayIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/api'}>
                        <ToolTip title="The API" aria-label="The API">
                            <ListItemIcon>
                                <FingerPrintIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={'/settings'}>
                        <ToolTip title="Settings" aria-label="Settings">
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                        </ToolTip>
                    </Link>
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


SideDrawerMain.propTypes = {
    classes: propTypes.object.isRequired,
    left: propTypes.bool.isRequired,
    toggleDrawer: propTypes.func.isRequired,
}

const SideDrawer = compose(
    withStyles(styles)
)(SideDrawerMain)

export { SideDrawer };
