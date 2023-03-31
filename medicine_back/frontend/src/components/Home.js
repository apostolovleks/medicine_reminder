import React, { Component } from "react";
import ReminderModal from "./ReminderModal";
import Avatar from "./Avatar";
import Calendar from "./Calendar";
import compareTimeToProperty from "../utils/compareTimeToProperty";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContent: null,
      reminders: []
    };
  }
  interval = null;


  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/reminder/');
      const reminders = await res.json();
      this.setState({
        reminders
      });


      this.interval = setInterval(() => {
        compareTimeToProperty(this.state.reminders);
      }, 1000 * 10);

    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  renderItems = () => {
    return this.state.reminders.map(item => (
      <li key={item.id}>
        {item.pill_name}
      </li>
    ));
  };

  addReminder = (reminder) => {
    this.setState(prevState => ({
      reminders: [...prevState.reminders, reminder]
    }));
  }


  deleteReminder = (reminderId) => {
    this.setState({ ...this.state, reminders: this.state.reminders.filter((reminder) => reminder.id !== parseInt(reminderId)) })
  };


  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalContent: null });
  };

  render() {
    const { isModalOpen, modalContent } = this.state;

    return (
      <>
        <div className="side-bar-avatar">
          <Avatar
            reminders={this.state.reminders}
            onPushButton={this.openModal} />
        </div>
        <div id="calendar">
          <Calendar deleteReminder={this.deleteReminder} reminders={this.state.reminders} />
        </div>

        <ReminderModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          content={modalContent}
          addReminder={this.addReminder}
        />

        <img src='/static/images/react.jpg' className='size_img'></img>

      </>)
  }
}