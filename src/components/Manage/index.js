import React from 'react';
import propTypes from 'prop-types';
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';


import * as ROUTES from '../../constants/routes';

import { withStyles } from '@material-ui/core/styles';


import Charts from './charts';
import Signin from '../Validation/index';

const ManagePage = ({ match }) => (
    <section id="manage" className="container-fluid h-100 bg-white">
        <div className="row bg-dark py-1 mb-3 text-white">
            <div className="col-12 text-right">
                <p className="d-inline mx-2 px-3 small font-weight-light border-right mb-0"> &nbsp; Last Update: 2018/03/25 14:00:03</p>
                <p className="d-inline mx-2 small font-weight-bold mb-0"> Manage Section</p>
            </div>
        </div>
        <ul>
            <li>
                <Link to={`${match.path}/items`} >ManageItems</Link>
            </li>
            <li>
                <Link to={`${match.path}/hello`}>Signin 
                Test</Link>
            </li>
            <li>
                <Link to={`${match.path}/`}>Test</Link>
            </li>
        </ul>
            <Route exact path={`${match.path}/`} component = {ManageMain} />
            <Route path={`${match.path}/items`} component={ManageItems} />
            <Route path={`${match.path}/hello`} component={Signin} />
    </section>
)

const ManageMain = () => (
    <div className="row text-dark">
        <div className="col">

        </div>
        <div className="col-7">

            <Charts />
        </div>
    </div>
)

const ManageItems = () => (
    <div className="text-dark">
        <h1 className="display-4">Items</h1>
    </div>
)

const Hello = () =>
    <div className="text-dark">
        <h1 className="display-4">Hello World</h1>
    </div>

// const ManagePage = ({ match }) =>
//     <section id="manage" className="container-fluid h-100 bg-white">

//     </section>

export default ManagePage;