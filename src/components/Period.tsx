import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { GREEN } from '~/services/colors';
import { Periods } from '~/services/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarRange from './CalendarRange';
import { Date, RangeDate } from '~/types/models';
import moment from 'moment';

type PeriodProps = {
  period: Periods;
  setPeriod: React.Dispatch<Periods>;
  handleChangeDate: any;
  date: Date;
  rangeDate: RangeDate;
  setRangeDate: React.Dispatch<RangeDate>;
  screen?: string;
};

function Period({
  period,
  setPeriod,
  handleChangeDate,
  date,
  rangeDate,
  setRangeDate,
  screen = 'all',
}: PeriodProps): JSX.Element {
  const [isCalendar, setIsCalendar] = useState(false);

  return (
    <>
      <View style={styles.periodContainer}>
        <TouchableOpacity
          // @ts-ignore
          style={styles.period(Periods.Day, period, screen)}
          onPress={() => setPeriod(Periods.Day)}>
          <Text
            // @ts-ignore
            style={styles.periodText(Periods.Day, period, screen)}>
            День
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // @ts-ignore
          style={styles.period(Periods.Week, period, screen)}
          onPress={() => {
            setPeriod(Periods.Week);
          }}>
          <Text
            // @ts-ignore
            style={styles.periodText(
              Periods.Week,
              setPeriod,
              screen,
            )}>
            Неделя
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // @ts-ignore
          style={styles.period(Periods.Month, period, screen)}
          onPress={() => setPeriod(Periods.Month)}>
          <Text
            // @ts-ignore
            style={styles.periodText(Periods.Month, period, screen)}>
            Месяц
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // @ts-ignore
          style={styles.period(Periods.Year, period, screen)}
          onPress={() => setPeriod(Periods.Year)}>
          <Text
            // @ts-ignore
            style={styles.periodText(Periods.Year, period, screen)}>
            Год
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // @ts-ignore
          style={styles.period(Periods.Other, period, screen)}
          onPress={() => {
            setPeriod(Periods.Other);
            setIsCalendar(true);
          }}>
          <Text
            // @ts-ignore
            style={styles.periodText(Periods.Other, period, screen)}>
            Период
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => handleChangeDate('back')}>
          <Icon
            name="angle-left"
            color={screen === 'all' ? 'black' : 'white'}
            size={25}
          />
        </TouchableOpacity>
        <Text
          // @ts-ignore
          style={styles.dateText(screen)}>
          {period === Periods.Week &&
            `${rangeDate.from.format(
              'DD MMMM',
            )} - ${rangeDate.to.format('DD MMMM')}`}
          {period === Periods.Day && date.day.format('DD MMMM')}
          {period === Periods.Month && date.month.format('MMMM')}
          {period === Periods.Year && date.year.format('YYYY')}
          {period === Periods.Other &&
            `${rangeDate.from.format(
              'DD MMMM',
            )} - ${rangeDate.to.format('DD MMMM')}`}
        </Text>
        <TouchableOpacity onPress={() => handleChangeDate('next')}>
          <Icon
            name="angle-right"
            color={screen === 'all' ? 'black' : 'white'}
            size={25}
          />
        </TouchableOpacity>

        <CalendarRange
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
          setRangeDate={setRangeDate}
        />
      </View>
    </>
  );
}

export default Period;

const styles = StyleSheet.create({
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  // @ts-ignore
  period: (
    state: Periods,
    togglePeriod: Periods,
    screen: string,
  ) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: togglePeriod === state ? 2 : 0,
    height: 24,
    borderColor: screen === 'all' ? GREEN : 'white',
  }),
  // @ts-ignore
  periodText: (
    state: Periods,
    togglePeriod: Periods,
    screen: string,
  ) => ({
    color:
      screen === 'all'
        ? togglePeriod === state
          ? GREEN
          : 'black'
        : 'white',
  }),
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    marginTop: 15,
  },
  // @ts-ignore
  dateText: (screen: string) => ({
    color: screen === 'all' ? 'black' : 'white',
  }),
});
