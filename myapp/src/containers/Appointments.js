import React, { Component } from 'react';
import './../style/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import uuid from 'uuid';
import AppointmentListItem from './../components/AppointmentListItem';
import areIntlLocalesSupported from 'intl-locales-supported';
import Moment from 'moment';

let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['en-GB'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/en-GB');
}

export default class Appointments extends Component {
  constructor(props){
    super(props);
    this.state = {
      appointmentList: [{ID: uuid.v4() , title: "Dette er første avtale", date: "10/10/2017", fromTime: "13:45", toTime: "14:00", place: "Gløshaugen"}, {ID: uuid.v4() , title: "Dette er andre avtale", date: "10/10/2017", fromTime: "14:30", toTime: "14:45", place: "Kalvskinnet"}]
    }
  }

  componentDidMount() {
    this.removeOldAppointments();
  }


  componentWillMount = () => {
    let appointmentList = JSON.parse(localStorage.getItem('appointments'));
    this.setState({
          appointmentList: appointmentList || []
      })
  }

  addAppointment = () => {
    let title = document.getElementById('titleText').value;
    let date = document.getElementById('dateValue').value;
    let fromTime = document.getElementById('fromTime').value;
    let toTime = document.getElementById('toTime').value;
    let place = document.getElementById('placeText').value;

    if(title !== "" && date !== "" && fromTime !== "" && toTime !== "" && place !== ""){
      if(fromTime >= toTime){
        alert("Appointment start-time must be before end-time");
      }else{
        let {appointmentList} = this.state;
        appointmentList.push({ID: uuid.v4(), title: title, date: date, fromTime: fromTime, toTime: toTime, place: place});
        let sortedAppointmentList = appointmentList.sort((a, b) => Date.parse(new Date(a.date.split("/").reverse().join("-"))) - Date.parse(new Date(b.date.split("/").reverse().join("-"))));
        this.setState({appointmentList: sortedAppointmentList});
        localStorage.setItem('appointments',JSON.stringify(sortedAppointmentList));
        window.location.reload();
      }
    }else{
      alert("All fields must be filled");
    }
  }

  deleteAppointment = (appointment) => {
    let {appointmentList} = this.state;
    let i = appointmentList.indexOf(appointment);
    appointmentList.splice(i,1);
    this.setState({appointmentList: appointmentList});
    localStorage.setItem('appointments',JSON.stringify(appointmentList));
  }

  removeOldAppointments = () => {
    let {appointmentList} = this.state;
    let today = new Date();
    let changedList = appointmentList.filter(function (appointment) {return (appointment.date.split("/").join("-")) >= (Moment(today).format("DD/MM/YYYY")).split("/").join("-")});
    this.setState({appointmentList: changedList});
    localStorage.setItem('appointments',JSON.stringify(changedList));
  }

  render() {
    let { appointmentList } = this.state;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="Appointments">
        <header className="Appointments-header">
          <h1 className="Appointments-title">Your Appointments</h1>
        </header>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Time</th>
                <th>Place</th>
              </tr>
              { appointmentList.map((item) => <AppointmentListItem appointment={item} key={item.ID} deleteAppointment={this.deleteAppointment}/>) }
            </tbody>
          </table>

          <div className="Create-Appointment">

            <h1 className="Appointments-title">Create new appointment</h1>
            <div>
              <TextField id="titleText" hintText="Enter title" />
              <DatePicker id="dateValue" hintText="Select Date" DateTimeFormat={DateTimeFormat} locale="en-GB"  />
              <TimePicker id="fromTime" format="24hr" hintText="Select start-time" minutesStep={15}/> <TimePicker id="toTime" format="24hr" hintText="Select end-time" minutesStep={15}/>
              <TextField id="placeText" hintText="Enter place/address" />
              <FlatButton id="addAppointment" onClick={this.addAppointment}>Add Appointment</FlatButton>
            </div>
          </div>
      </div>
      </MuiThemeProvider>
    );
  }
}
