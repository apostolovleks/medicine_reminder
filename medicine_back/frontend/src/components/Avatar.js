import React, { Component } from "react";
import ButtonPlus from "./ButtonPlus";

export default class Avatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    filterEventsByDay(events) {
        const today = new Date();
        const eventsToday = events.filter((event) => {
            const eventDate = new Date(event.periodicity_date_time);
            return (
                eventDate.getDate() === today.getDate() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
            );
        });
        return eventsToday;
    }

    renderItems = (reminders) => {
        const eventsToday = this.filterEventsByDay(reminders)
        return eventsToday.map(item => (
            <li key={item.id}>
                {item.pill_name}
            </li>
        ));
    };

    render() {
        const { reminders } = this.props;
        if (!reminders) return null;

        return (
            <>
                <div className='position_element_in_div position_avatar'>
                    <img src="/static/images/avatar_2.jpg"
                        alt="Space Cat's avatar"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} />
                </div>

                <div className='position_element_in_div'>
                    <p className="input_name">User name</p>
                </div>

                <div class="position_element_in_div sticker-wrapper">
                    <aside class="sticker yellow">
                        <div>Today:</div>
                        <p>
                            <ul>
                                {this.renderItems(reminders)}
                            </ul>
                        </p>
                        <span class="fold"></span>
                    </aside>
                    <ButtonPlus onPushButton={this.props.onPushButton}></ButtonPlus>
                </div>
            </>

        );
    }
}