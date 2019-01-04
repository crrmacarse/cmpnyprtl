import React from 'react';
import moment from 'moment';

import { withAuthorization } from '../Session';

import BigCalendar from 'react-big-calendar';
import { Loading } from '../Include';

import '../../assets/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class CalendarPage extends React.Component {
    state = {
        events: [],
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.calendar().on('value', snapshot => {
            const listObject = snapshot.val();


            Object.keys(listObject).forEach(function (key){

                /*
                
                    A mini proccess on converting a date-formatted String inside an Object to a Date type.

                    solution for: a bug when u clicked ( week / day ) wherein it get confuses with date-formatted string
               
                */ 

                listObject[key].start = new Date(listObject[key].start)
                listObject[key].end = new Date(listObject[key].end)
                
            });         

            const calendarList = Object.keys(listObject || {}).map(key => ({
                ...listObject[key],
                id: key
            }))
            
            this.setState({
                events: calendarList,
                loading: false
            })

        })

    }

    componentWillMount() {
        this.props.firebase.calendar().off();
    }

    render() {
        const { events, loading } = this.state;

        return (
            <section className="container-fluid">
                <div className="row">
                    {
                        loading
                            ? <Loading />
                            : <div className="col-md-12 col-12">
                                <div className="py-3">
                                    <BigCalendar
                                        localizer={localizer}
                                        defaultDate={new Date()}
                                        defaultView="month"
                                        events={events}
                                        style={{ height: "90vh" }}
                                    />
                                </div>
                            </div>
                    }
                </div>
            </section>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CalendarPage);