import React from 'react';

import { withAuthorization, AuthUserContext } from '../Session';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const HomePage = () => (
    <div className="container-fluid bg-light h-100">
        <div className="row">
            <div className="col-md-4 col-12">
                <div className="d-flex justify-content-center">
                    <div className="p-2 flex-fill">
                        <p className="h4 font-weight-bold m-4">Home Feed</p>
                        <div className="m-2">
                            <ExpansionPanel defaultExpanded>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="">
                                        <p className="h6">Lorem Ipsum Dolor</p>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="">
                                        <p className="small">
                                            Vestibulum mattis tellus eu magna mollis tincidunt.
                                            Proin lacus est, vulputate ac elit vel, vulputate
                                            vestibulum tortor. Vestibulum pulvinar leo id mauris ultrices congue.
                                        </p>
                                        <div className="text-right">
                                            <p className="text-secondary small">
                                                05/29/2015 5:50 AM, @crrmacarse
                                           </p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <div className="m-2">
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="">
                                        <p className="h6">Lorem Ipsum Dolor</p>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="">
                                        <p className="small">
                                            Vestibulum mattis tellus eu magna mollis tincidunt.
                                            Proin lacus est, vulputate ac elit vel, vulputate
                                            vestibulum tortor. Vestibulum pulvinar leo id mauris ultrices congue.
                                        </p>
                                        <div className="text-right">
                                            <p className="text-secondary small">
                                                05/29/2015 5:50 AM, @crrmacarse
                                           </p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <div className="m-2">
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="">
                                        <p className="h6">Lorem Ipsum Dolor</p>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="">
                                        <p className="small">
                                            Vestibulum mattis tellus eu magna mollis tincidunt.
                                            Proin lacus est, vulputate ac elit vel, vulputate
                                            vestibulum tortor. Vestibulum pulvinar leo id mauris ultrices congue.
                                        </p>
                                        <div className="text-right">
                                            <p className="text-secondary small">
                                                05/29/2015 5:50 AM, @crrmacarse
                                           </p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                </div>
            </div>
            {/* TODO: Fix. esp on mobile. probably can be done using flex */}
            <div className="col-md-8 col-12 ">
                <AuthUserContext.Consumer>
                    {authUser =>
                        <h1 className="m-3 text-right h4 font-weight-bold text-">Hello, {authUser.email} 👋</h1>
                    }
                </AuthUserContext.Consumer>
                <div className="row">
                    <div className="col-md-12 col-12">
                        <div className="d-flex bd-highlight ">
                            {/* TODO: Figures / number here*/}
                            <div className="p-5 bg-secondary">
                                
                            </div>
                            <div className="p-5 order-3 flex-fill bg-success"></div>
                            <div className="p-5 flex-fill order-1 bg-warning"></div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    {/* <div className="col-md-6 col-6">
                        <div className="d-flex bd-highlight ">
                            <div className="p-5 flex-fill bg-success"></div>
                            <div className="p-5 order-3 flex-fill bg-dark"></div>
                            <div className="p-5 flex-fill order-1 bg-warning"></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-6">
                        <div className="d-flex bd-highlight ">
                            <div className="p-5 flex-fill bg-secondary"></div>
                            <div className="p-5 order-3 flex-fill bg-danger"></div>
                            <div className="p-5 flex-fill order-1 bg-info"></div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);