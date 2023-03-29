import React, { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';



export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    }


    componentDidMount() {
        this.mapDataToEvents(this.props.reminders);
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.reminders)
        console.log(this.props.reminders)
        console.log(prevProps.reminders !== this.props.reminders)
        if (prevProps.reminders !== this.props.reminders) {
            this.mapDataToEvents(this.props.reminders);
        }
    }

    mapDataToEvents = (data) => {
        const events = data.map((item) => {
            return {
                id: item.id,
                title: item.pill_name,
                start: new Date(item.periodicity_date_time),
                // end: new Date(item.last_date_time),
                allDay: false,

            };
        });

        this.setState({ events });
    };


    handleEventClick = (clickInfo) => {
        console.log('Event clicked: ', clickInfo.event.id);
    }
    handleEventChange = (eventChangeInfo) => {
        // handle event change
        const updatedEvent = { ...eventChangeInfo.event.toPlainObject() };
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    }


    handleEventDelete = (deleteInfo) => {
        axios
            .delete(`/api/reminder/${deleteInfo.event.id}/`)
            .then((resp) => {
                this.props.deleteReminder(deleteInfo.event.id);
                // const events = this.state.events.filter((event) => event.id !== deleteInfo.event.id);
                // this.setState({ events });
            })
            .catch((error) => console.log(error));
        const events = this.state.events.filter((event) => event.id !== deleteInfo.event.id);
        this.setState({ events });
    };


    render() {

        return (
            <div id="calendar">
                <FullCalendar
                    plugins={[timeGridPlugin, dayGridPlugin]}
                    allDaySlot={false}
                    initialView="dayGridWeek"
                    events={this.state.events}
                    editable={true}
                    headerToolbar={{
                        end: "dayGridDay,timeGridWeek,dayGridMonth"
                    }}
                    // eventClick={this.handleEventClick}
                    eventChange={this.handleEventChange}
                    eventClick={this.handleEventDelete}
                />
            </div>
        );
    }
}