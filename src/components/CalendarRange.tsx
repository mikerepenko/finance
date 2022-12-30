import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { GREEN, RED, WHITE } from '~/services/colors';
import { RangeDate } from '~/types/models';

type CalendarProps = {
  isCalendar: boolean;
  setIsCalendar: React.Dispatch<boolean>;
  setRangeDate: React.Dispatch<RangeDate>;
};

function CalendarRange({
  isCalendar,
  setIsCalendar,
  setRangeDate,
}: CalendarProps): JSX.Element {
  const [selectedStartDate, setSelectedStartDate] =
    useState<moment.Moment>(moment());
  const [selectedEndDate, setSelectedEndDate] =
    useState<moment.Moment>(moment().add(2, 'day'));

  const onDateChange = (date: moment.Moment, type: string) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      setRangeDate({
        from: selectedStartDate,
        to: date ? date : moment(),
      });
    } else {
      setSelectedStartDate(date);
      setRangeDate({
        from: date ? date : moment(),
        to: selectedEndDate,
      });
    }
  };

  return (
    <>
      {isCalendar && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendar}
          style={styles.modal}>
          <View style={styles.calendar}>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsCalendar(false)}>
                <Text style={styles.textCancel}>Отменить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsCalendar(false);
                  setRangeDate({
                    from: selectedStartDate,
                    to: selectedEndDate,
                  });
                }}>
                <Text style={styles.textApply}>Применить</Text>
              </TouchableOpacity>
            </View>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
          </View>
        </Modal>
      )}
    </>
  );
}

export default CalendarRange;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  modal: {
    flex: 1,
  },
  calendar: {
    backgroundColor: WHITE,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 30,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  textApply: {
    color: GREEN,
  },
  textCancel: {
    color: RED,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
