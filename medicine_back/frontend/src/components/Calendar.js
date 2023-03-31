import React, { Component } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';


export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    }


    componentDidUpdate(prevProps) {
        if (prevProps.reminders !== this.props.reminders) {
            this.mapDataToEvents(this.props.reminders);
        }
    }

    mapDataToEvents = (data) => {
        const events = data.map((item) => {
            return {
                id: item.id,
                title: item.pill_name,
                description: item.description,
                start: new Date(item.periodicity_date_time),
                allDay: false,

            };
        });

        this.setState({ events });
    };


    handleEventChange = (eventChangeInfo) => {
        const updatedEvent = { ...eventChangeInfo.event.toPlainObject() };
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    }


    handleEventDelete = (event_id) => {
        axios
            .delete(`/api/reminder/${event_id}/`)
            .then((resp) => {
                this.props.deleteReminder(event_id);
            })
            .catch((error) => console.log(error));
    };

    eventContent = (eventInfo) => {
        return (
            <>
                <div className="event-card">
                    <div>{eventInfo.event.title}</div>
                    <p>{eventInfo.event.extendedProps.description}</p>
                    <div className="close-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                            onClick={() => this.handleEventDelete(eventInfo.event.id)}>
                            <path
                                fillRule="evenodd"
                                d="M9.293 8l3.853-3.853a.5.5 0 1 0-.707-.707L8.586 7.293 4.733 3.44a.5.5 0 0 0-.707.707L7.879 8l-3.853 3.853a.5.5 0 0 0 .708.707L8.586 8.707l3.853 3.853a.5.5 0 0 0 .707-.707L9.293 8z"
                            />
                        </svg>
                    </div>
                    <div className="time-text">{eventInfo.timeText}</div>
                </div>
            </>
        )
    }

    columnHeaderText = ({ date }) => {
        const options = { weekday: 'long', day: 'numeric', month: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-DE', options)
            .replace(',', '')
            .replace('/', '.');

        return formattedDate;
    };


    render() {

        return (
            <>
                <FullCalendar
                    style={{ margin: '20px' }}
                    height="100%"

                    plugins={[timeGridPlugin, dayGridPlugin]}
                    allDaySlot={false}
                    initialView="dayGridWeek"
                    events={this.state.events}
                    editable={true}
                    headerToolbar={{
                        center: "today prev,next",
                        end: "dayGridDay,dayGridWeek,dayGridMonth"
                    }}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: false
                    }}

                    eventContent={this.eventContent}
                    dayHeaderContent={this.columnHeaderText}
                />
            </>
        );
    }
}