import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);

  const formatDateTime = (date, time) => {
    return (
      moment(date).format('MMMM DD, YYYY') +
      ' ' +
      moment(time).format('hh:mm A')
    );
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      setShowTimePicker(true);
    }
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  const handleSelectDate = () => {
    setShowDatePicker(false);
    setUserDetailsVisible(true);
  };

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
      setUserDetailsVisible(true);
    }
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
  };

  const handleSelectTime = () => {
    setShowTimePicker(false);
    setUserDetailsVisible(true);
  };

  const handleLogout = () => {
    // Perform logout logic (clear user data, navigate to login screen, etc.)
    setUserDetailsVisible(false); // Hide user details when logging out
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleUserDetailsToggle = () => {
    setUserDetailsVisible(!userDetailsVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleUserDetailsToggle}
        style={styles.userDetailsButton}>
        <Text style={styles.userDetailsButtonText}>User Details</Text>
      </TouchableOpacity>

      {userDetailsVisible && (
        <View style={styles.userDetails}>
          <Text style={styles.userDetailsText}>
            Username: {route.params.username}
          </Text>
          <Text style={styles.userDetailsText}>
            Password: {route.params.password}
          </Text>
          <Text style={styles.userDetailsText}>
            Selected date and time: {formatDateTime(selectedDate, selectedTime)}
          </Text>
        </View>
      )}

      <Text style={styles.header}>User Information</Text>
      <TouchableOpacity style={styles.button} onPress={handleShowDatePicker}>
        <Text>Pick a Date</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleShowTimePicker}>
        <Text>Pick a Time</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="clock"
          onChange={handleTimeChange}
        />
      )}

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  userDetailsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  userDetailsButtonText: {
    color: 'white',
  },
  userDetails: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  userDetailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomeScreen;
