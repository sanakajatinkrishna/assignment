// components/Calendar.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CustomCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    onSelectDate(date.dateString);
  };

  return (
    <View>
      <Calendar onDayPress={handleDateSelect} />
      {selectedDate ? <Text>Selected Date: {selectedDate}</Text> : null}
    </View>
  );
};

export default CustomCalendar;
