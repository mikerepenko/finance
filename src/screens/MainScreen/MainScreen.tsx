import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Toolbar from './components/Toolbar';
import Budget from './components/Budget';
import Toggle from './components/Toggle';
import List from '~/components/List';
import { ArticleTypes, Periods } from '~/services/constants';
import { useState } from 'react';
import moment from 'moment';
import { useTypedSelector } from '~/hooks/redux';
import Range from './components/Range';
import { Date, RangeDate } from '~/types/models';
import {
  calculateMoneybox,
  calculateTotal,
  filteredTransactionsByPeriod,
} from '~/services/utils';
import Moneybox from './components/Moneybox';

function MainScreen(): JSX.Element {
  const [articleType, setArticleType] = useState<ArticleTypes>(
    ArticleTypes.Expenses,
  );

  const { expenses } = useTypedSelector(state => state.expenses);
  const { incomes } = useTypedSelector(state => state.incomes);
  const { moneybox } = useTypedSelector(state => state.moneybox);

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

  const transactions =
    (articleType === ArticleTypes.Expenses &&
      filteredTransactionsByPeriod(
        period,
        expenses,
        rangeDate,
        date,
      )) ||
    (articleType === ArticleTypes.Incomes &&
      filteredTransactionsByPeriod(
        period,
        incomes,
        rangeDate,
        date,
      )) ||
    (articleType === ArticleTypes.Moneybox &&
      filteredTransactionsByPeriod(
        period,
        moneybox,
        rangeDate,
        date,
      )) ||
    [];

  const total = () => {
    if (articleType !== ArticleTypes.Moneybox) {
      return calculateTotal(transactions);
    }

    return calculateMoneybox(transactions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar />
      <Budget
        articleType={articleType}
        expenses={expenses}
        incomes={incomes}
        moneybox={moneybox}
      />
      <Toggle
        articleType={articleType}
        setArticleType={setArticleType}
      />
      <Range
        date={date}
        setDate={setDate}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
        period={period}
        setPeriod={setPeriod}
        articleType={articleType}
        total={total()}
      />
      {articleType === ArticleTypes.Moneybox ? (
        <Moneybox
          articleType={articleType}
          transactions={transactions}
        />
      ) : (
        <>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <List
              articleType={articleType}
              transactions={transactions}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
