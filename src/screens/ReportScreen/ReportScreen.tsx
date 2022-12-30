import { View, Text, StyleSheet } from 'react-native';
import Chart from './components/Chart';
import List from './components/List';
import { useTypedSelector } from '~/hooks/redux';
import { Periods, PeriodTypes } from '~/services/constants';
import { useState } from 'react';
import {
  filteredTransactionsByPeriod,
  formatDate,
  formatRangeDate,
} from '~/services/utils';
import { Date, RangeDate } from '~/types/models';
import moment from 'moment';
import Period from '~/components/Period';

function ReportScreen(): JSX.Element {
  const { expenses } = useTypedSelector(state => state.expenses);
  const { incomes } = useTypedSelector(state => state.incomes);

  const [date, setDate] = useState<Date>({
    day: moment(),
    month: moment(),
    year: moment(),
  });
  const [rangeDate, setRangeDate] = useState<RangeDate>({
    from: moment().startOf('isoWeek'),
    to: moment().endOf('isoWeek'),
  });
  const [period, setPeriod] = useState<Periods>(Periods.Week);

  const expensesByPeriod = filteredTransactionsByPeriod(
    period,
    expenses,
    rangeDate,
    date,
  );

  const incomesByPeriod = filteredTransactionsByPeriod(
    period,
    incomes,
    rangeDate,
    date,
  );

  const handleChangeDate = (event: string) => {
    setRangeDate(formatRangeDate(period, rangeDate, event));
    setDate(formatDate(period, date, event));
  };

  return (
    <View style={styles.container}>
      <Period
        period={period}
        setPeriod={setPeriod}
        handleChangeDate={handleChangeDate}
        date={date}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
      />
      <Chart expenses={expensesByPeriod} incomes={incomesByPeriod} />
      <List expenses={expensesByPeriod} incomes={incomesByPeriod} />
    </View>
  );
}

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
