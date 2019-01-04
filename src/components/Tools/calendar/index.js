import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import { withAuthorization } from '../../Session';

const INITIAL_STATE = {
    eventName: '',
    startDate: moment(),
    endDate: null,
}

class ManageCalendarForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
        }

    }

    handleDateChange = (name, date) => {
        this.setState({ [name]: date })

        /*
            Note: If you're confused in the parameter passing... so am i. here is the link for the solution:

            https://github.com/Hacker0x01/react-datepicker/issues/242

        */
    }

    handleValueChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    }

    /*
        Verifies the user if this is a 1 day event or extended. it adds a default 1 day starting

    */

    handleCheck = event => {
        // FIX: interaction error in checkbox toggle.
        event.target.checked
            ? this.setState(prevState => ({
                endDate: prevState.startDate.clone().add(1, 'days')
            }))
            : this.setState({ endDate: null })

    }

    onSubmit = event => {
        const { startDate, endDate, eventName } = this.state;
        const { enqueueSnackbar } = this.props;

        let endDateValidated = !!endDate ? endDate : startDate

        this.props.firebase
            .calendar()
            .push({
                title: eventName,
                start: startDate.format(),
                end: endDateValidated.format(),
            })
            .then(() => {
                this.setState({
                    ...INITIAL_STATE
                })
                enqueueSnackbar('Added Succsefully', { variant: 'success' });
            })
            .catch(error => {
                enqueueSnackbar(error.message, { variant: 'warning' })
            })
        event.preventDefault();
    }

    render() {
        const {
            startDate,
            endDate,
            eventName
        } = this.state;

        const dateEndClass = (!!endDate ? 'mx-4' : 'd-none')

        return (
            <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                <form onSubmit={this.onSubmit}>
                    <p className="display-4">Manage Calendar of Activites</p>
                    <div className="m-4">
                        <input
                            name="eventName"
                            type="text"
                            value={eventName}
                            placeholder="Event Name"
                            onChange={this.handleValueChange}
                            required
                        />
                    </div>
                    <div className="m-4">
                        <InlineDateTimePicker
                            keyboard
                            name="datestart"
                            label="Date Start"
                            value={startDate}
                            onChange={this.handleDateChange.bind(this, 'startDate')}
                            required
                        />
                        <br /><br />
                        <input type="checkbox" value="true" onClick={this.handleCheck} /> Not Same Day?
                        </div>
                    <div className={dateEndClass}>
                        <InlineDateTimePicker
                            keyboard
                            name="dateend"
                            label="Date End"
                            value={endDate}
                            onChange={this.handleDateChange.bind(this, 'endDate')}
                            clearable
                        />
                    </div>
                    <button type="submit" name="submit" className="mx-4">Submit</button>
                </form>
            </MuiPickersUtilsProvider>
        )
    }
}

const ManageCalendar = () =>
    <div className="row">
        <div className="col-12">
            <ManageCalendarFormWrapped />
        </div>
    </div>

const condition = authUser => !!authUser;

const ManageCalendarWrapped = compose(
    withAuthorization(condition),
)(ManageCalendar);

const ManageCalendarFormWrapped = compose(
    withSnackbar,
    withAuthorization(condition),
)(ManageCalendarForm);

export default ManageCalendarWrapped;