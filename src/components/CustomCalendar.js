import React, { useEffect, useRef } from 'react';
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import { Colors, Fonts } from '../globals/GlobalConfig';
import moment from "moment";
import GlobalStyle from '../globals/GlobalStyle';
import CustomToast from './CustomToast';

const CustomCalendar = (props) => {
  const {
    isStartDate,
    currentDate,
    endDate,
    isDateModalVisible,
    funcGetDate,
    onBackdropPress,
    lastUpdate,
    message
  } = props;

  const toastRef = useRef(null);

  useEffect(() => {
    const { current } = toastRef
    if(lastUpdate){
      current.showToast('warning', message)
    }
  }, [lastUpdate])

  var enumerateDaysBetweenDates = function (startDate, endDate) {
    var now = startDate, dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  };

  var fromDate = moment(currentDate).add(1, 'days');
  var toDate = moment(endDate).subtract(1, 'days');
  const results = enumerateDaysBetweenDates(fromDate, toDate);
  const dateResults = {
    [currentDate]: {
      startingDay: true,
      color: Colors.BLUE_LIGHT
    },
    ...results.reduce((acc, cur) => {
      acc[cur] = {
        color: Colors.GRAY
      }
      return acc
    }, {}),
    [endDate]: {
      endingDay: true,
      color: Colors.BLUE_LIGHT
    },
  }

  const isStartdates = isStartDate
  const modalContent = (
    <View style={GlobalStyle.calendarModalContainer}>
      <Calendar
        maxDate={new Date()}
        onDayPress={(day) => funcGetDate(day)}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => {
          console.log('month changed', month)
        }}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={dateResults}
        markingType='period'
      />
      <View style={{ height: 50, width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        {!isStartdates ? <Text style={{
          fontSize: 16,
          fontFamily: Fonts.SF_MEDIUM,
        }}>Select Start Date</Text> 
        : 
        <Text style={{
          fontSize: 16,
          fontFamily: Fonts.SF_MEDIUM,
        }}>Select End Date</Text>}
      </View>
      <CustomToast ref={toastRef} />
    </View>
  )
  return (
    <>
    <Modal
      avoidKeyboard={Platform.OS === "ios"}
      onBackdropPress={onBackdropPress}
      isVisible={isDateModalVisible}
      children={modalContent}
      style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
    />
   
    </>
  )
}

export default CustomCalendar


