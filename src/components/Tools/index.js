import React from 'react';

import { withAuthorization } from '../Session';

import ManageCalendar from './calendar';

const ToolsPage = () => (
    <div className = "container-fluid">
        <div className = "row">
            <ManageCalendar />
        </div>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ToolsPage);

// TODO: Add specific tools like wtidir here?

