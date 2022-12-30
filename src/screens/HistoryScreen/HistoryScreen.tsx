import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import Toggle from './components/Toggle';
import List from '~/components/List';
import { ArticleTypes, Periods } from '~/services/constants';
import { useEffect, useState } from 'react';
import { GREEN, RED, WHITE } from '~/services/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/components/Navigation';
import moment from 'moment';
import { useTypedSelector } from '~/hooks/redux';
import Calendar from '~/components/CalendarRange';
import Period from '~/components/Period';
import {
  filteredTransactionsByPeriod,
  formatDate,
  formatRangeDate,
} from '~/services/utils';
import { Date, RangeDate } from '~/types/models';

function HistoryScreen(): JSX.Element {
  const [articleType, setArticleType] = useState<ArticleTypes>(
    ArticleTypes.Expenses,
  );
  const navigation = useNavigation<NavigationProps>();

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

  useEffect(() => {
    navigation.setOptions({
      title: 'История',
      headerStyle: {
        backgroundColor: GREEN,
      },
      headerTintColor: '#fff',
    });
  }, []);

  useEffect(() => {
    if (period === Periods.Week) {
      setRangeDate({
        from: moment().startOf('isoWeek'),
        to: moment().endOf('isoWeek'),
      });
    }

    if (period === Periods.Other) {
      setRangeDate({
        from: moment(),
        to: moment(),
      });
    }

    setDate({
      day: moment(),
      month: moment(),
      year: moment(),
    });
  }, [period]);

  const handleChangeDate = (event: string) => {
    setRangeDate(formatRangeDate(period, rangeDate, event));
    setDate(formatDate(period, date, event));
  };

  const transactions =
    articleType === ArticleTypes.Expenses
      ? filteredTransactionsByPeriod(
          period,
          expenses,
          rangeDate,
          date,
        )
      : filteredTransactionsByPeriod(
          period,
          incomes,
          rangeDate,
          date,
        );

  return (
    <View style={styles.container}>
      <Toggle
        setArticleType={setArticleType}
        articleType={articleType}
      />
      <Period
        period={period}
        setPeriod={setPeriod}
        handleChangeDate={handleChangeDate}
        date={date}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
      />
      <List articleType={articleType} transactions={transactions} />
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
});
