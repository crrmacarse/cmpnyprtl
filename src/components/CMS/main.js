import React from 'react';

import { Loading } from '../Include';

const MainPage = ({BusinessUnitEl, loading}) =>
    <React.Fragment>
        {loading && <Loading /> }
        <div className="row">
            <div className="col-12 col-md-12">
                <p className="display-4 text-secondary text-center my-5">
                    Content Management System Dashboard
                </p>
            </div>
        </div>
        <div className="row">
            {BusinessUnitEl}
        </div>
    </React.Fragment>


export default MainPage;