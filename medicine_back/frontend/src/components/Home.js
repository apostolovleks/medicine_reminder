import React, { Component } from "react";
import ReminderModal from "./ReminderModal";
import Avatar from "./Avatar";
import ButtonPlus from "./ButtonPlus";
import Calendar from "./Calendar";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContent: null,
      reminders: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/reminder/');
      const reminders = await res.json();
      this.setState({
        reminders
      });
    } catch (e) {
      console.log(e);
    }
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
    console.log('this.state BEFORE', this.state)
    this.setState(prevState => ({
        reminders: prevState.reminders.filter((reminder) => reminder.id !== reminderId),
    }));
    this.setState({...this.state, reminders: this.state.reminders.filter((reminder) => reminder.id !== parseInt(reminderId))}, () => console.log('this.state', this.state))
    
  };

  // deleteReminder = (reminderId) => {
  //   this.setState(prevState => ({
  //     reminders: prevState.reminders.filter((reminder) => reminder.id !== reminderId),
  //   }));
  //   console.log(reminderId)
  // }

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
          <Avatar />
          <ButtonPlus onPush={this.openModal}></ButtonPlus>
        </div>

        <Calendar deleteReminder={this.deleteReminder} reminders={this.state.reminders} />

        <ReminderModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          content={modalContent}
          reminders={this.state.reminders}
          addReminder={this.addReminder}
        />



        {/* <ul>{this.renderItems()}</ul> */}
        <img src='/static/images/react.jpg' className='size_img'></img>

      </>)
  }
}