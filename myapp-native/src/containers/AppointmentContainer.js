import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import uuid from 'uuid';
import Moment from 'moment';



export default class AppointmentContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //List with appointments
      title:"",
      date:"",
      sTime:"",
      eTime:"",
      place:"",
      appointmentList: [{ID: uuid.v4() , title: "Dette er første avtale", date: "10/10/2017", fromTime: "13:45", toTime: "14:00", place: "Gløshaugen"}, {ID: uuid.v4() , title: "Dette er andre avtale", date: "10/10/2017", fromTime: "14:30", toTime: "14:45", place: "Kalvskinnet"}]
    }
  }
  /*
  componentDidMount() {
    this.removeOldAppointments();
  }
  //Sets the states appointmentlist from the users localStorage
  componentWillMount = () => {
    let appointmentList = JSON.stringify(AsyncStorage.getItem('appointments'));
    this.setState({
          appointmentList: appointmentList || []
      })
  }
  removeOldAppointments = () => {
    let {appointmentList} = this.state;
    let today = new Date();
    //Creates a new list with appointments with a date today or later
    let changedList = appointmentList.filter(function (appointment) {return (appointment.date.split("/").join("-")) >= (Moment(today).format("DD/MM/YYYY")).split("/").join("-")});
    this.setState({appointmentList: changedList});
    AsyncStorage.setItem('appointments',JSON.stringify(changedList));
  }
*/

  addAppointment = () => {
    let {title} = this.state;
    let {date} = this.state;
    let {sTime} = this.state;
    let {eTime} = this.state;
    let {place} = this.state;

    if(title !== "" && date !== "" && sTime !== "" && eTime !== "" && place !== ""){
      //Checks if the start-time is before the set end-time
      if(sTime >= eTime){
        alert("Appointment start-time must be before end-time");
      }else{
        //Adds the new appointment to the list
        let {appointmentList} = this.state;
        appointmentList.push({ID: uuid.v4(), title: title, date: date, sTime: sTime, eTime: eTime, place: place});
        //Sorts the list on the date
        let sortedAppointmentList = appointmentList.sort((a, b) => Date.parse(new Date(a.date.split("/").reverse().join("-"))) - Date.parse(new Date(b.date.split("/").reverse().join("-"))));
        //Sets the states list to the new sorted list
        this.setState({appointmentList: sortedAppointmentList});
        //Saves the list to localStorage
        //Reloads form to refresh the input fields
        console.log(appointmentList);
      }
    }else{
      alert("All fields must be filled");
    }
  }

  render() {
    let { title, appointmentList } = this.state;
    return (
      <View style={styles.container}>
        <Text>Create Appointment</Text>
        <TextInput
          style={{width: 150}}
          placeholder="Enter title"
          onChangeText={(title) => {
            this.setState({title})} }/>
        <DatePicker
          date={this.state.date}
          format="DD/MM/YYYY"
          placeholder="Enter date"

          onDateChange={(date) => {this.setState({date: date})}}
        />
        <DatePicker
          onDateChange={(sTime) => {this.setState({sTime: sTime})}}
          date={this.state.sTime}

          mode="time"
          format="HH:mm"
        placeholder="Enter start time"/>
        <DatePicker
          onDateChange={(eTime) => {this.setState({eTime: eTime})}}
          date={this.state.eTime}
          mode="time"
          format="HH:mm"
        placeholder="Enter end time"/>
        <TextInput

          style={{width: 150}}
          placeholder="enter place/address"
          onChangeText={(place) => {
            this.setState({place})} }/>
        <Button
          onPress={this.addAppointment}
          style={{width: 150}}
        value="Add"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
