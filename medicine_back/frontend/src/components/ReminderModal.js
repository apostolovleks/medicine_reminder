import React, { Component } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';

import { VscChromeClose } from "react-icons/vsc";
import { ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import theme from "../utils/themeColors";
import 'dayjs/locale/de';



export default class ReminderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pill_name: "",
            description: "",
            periodicity_date_time: null,
            last_date_time: null,

        };

        this.handleInputPillName = this.handleInputPillName.bind(this);
        this.handleInputDescription = this.handleInputDescription.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleLastDateChange = this.handleLastDateChange.bind(this);
    }

    handleInputPillName(event) {
        this.setState({ pill_name: event.target.value });
    };

    handleInputDescription(event) {
        this.setState({ description: event.target.value });
    };

    handleDateChange(date) {
        this.setState({ periodicity_date_time: date });
    };

    handleLastDateChange(date) {
        this.setState({ last_date_time: date });
    };

    clearFields() {
        this.setState({
            pill_name: "",
            description: "",
            periodicity_date_time: null,
            last_date_time: null,
        });
    };

    createReminder = () => {
        axios
            .post('http://127.0.0.1:8000/api/reminder/', {
                pill_name: this.state.pill_name,
                description: this.state.description,
                periodicity_date_time: this.state.periodicity_date_time.toDate(),
                last_date_time: this.state.last_date_time.toDate()
            })
            .then(resp => {
                this.props.addReminder(resp.data);
                this.props.onClose();
                this.clearFields();
            })
            .catch(error => console.log(error));

    };


    render() {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div className="modal">
                <div className="modal__content">

                    <div className="close_button_div">
                        <span className="close_button" onClick={onClose}><VscChromeClose /></span>
                    </div>

                    <div className="column_direction">
                        <input
                            className="fields"
                            type="text"
                            placeholder="Medicine name"
                            value={this.state.pill_name}
                            onChange={this.handleInputPillName} />

                        <input
                            className="fields"
                            type="text"
                            placeholder="Dose"
                            value={this.state.description}
                            onChange={this.handleInputDescription} />
                    

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">

                        <DateTimePicker
                            sx={{
                                mt: 1,
                                bgcolor: '#e7ffd5',
                            }}
                            value={this.state.periodicity_date_time}
                            slotProps={{ textField: { size: 'small' } }}
                            label="Date and Time"
                            ampm={false}
                            onChange={this.handleDateChange}
                        />

                        <DateTimePicker
                            sx={{
                                mt: 1,
                                bgcolor: '#e7ffd5',
                            }}
                            value={this.state.last_date_time}
                            slotProps={{ textField: { size: 'small' } }}
                            label="Last Date"
                            ampm={false}
                            onChange={this.handleLastDateChange}
                        />

                    </LocalizationProvider>
                    </div>
                    

                    <ThemeProvider theme={theme}>
                        <div className="create-button">
                            <Button color="primary" onClick={() => this.createReminder()} variant="contained">Create</Button>
                        </div>
                    </ThemeProvider>
                <img src='/static/images/react.jpg'></img>
                </div>
            </div>
        );
    }
}