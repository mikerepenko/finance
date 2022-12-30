import { StyleSheet, View, Text } from 'react-native';
import { ArticleTypes } from '~/services/constants';
import { calculateMoneybox, calculateTotal } from '~/services/utils';
import { Expense, Income, Moneybox } from '~/types/models';
import { GREEN } from '../../../services/colors';

type BudgetProps = {
  articleType: ArticleTypes;
  expenses: Expense[];
  incomes: Income[];
  moneybox: Moneybox[];
};

function Budget({
  articleType,
  expenses,
  incomes,
  moneybox,
}: BudgetProps): JSX.Element {
  const total =
    (articleType !== ArticleTypes.Moneybox &&
      calculateTotal(expenses) - calculateTotal(incomes)) ||
    calculateMoneybox(moneybox);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        {articleType !== ArticleTypes.Moneybox
          ? 'Баланс'
          : 'В копилке'}
      </Text>
      <View style={styles.containerBottom}>
        <Text style={styles.sumText}>{total}</Text>
        <Text style={styles.currencyText}>₽</Text>
      </View>
    </View>
  );
}

export default Budget;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerBottom: {
    color: GREEN,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontWeight: 'bold',
  },
  sumText: {
    fontSize: 18,
    color: GREEN,
    fontWeight: 'bold',
  },
  currencyText: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
