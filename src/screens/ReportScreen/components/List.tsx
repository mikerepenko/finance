import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PeriodTypes } from '~/services/constants';
import { GREEN, RED, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { Expense, Income } from '~/types/models';
import { calculateTotal } from '~/services/utils';

type ListProps = {
  expenses: Expense[];
  incomes: Income[];
};

function List({ expenses, incomes }: ListProps): JSX.Element {
  const totalExpenses = calculateTotal(expenses);
  const totalIncomes = calculateTotal(incomes);

  const percentExpenses = (
    (totalExpenses / (totalExpenses + totalIncomes)) *
    100
  ).toFixed(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.item, backgroundColor: GREEN }}>
        <View style={styles.column}>
          <Icon name="plus" size={40} color={WHITE} />
          <Text style={styles.text}>Заработок</Text>
          <Text style={styles.text}>
            {100 - Number(percentExpenses)}%
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{totalIncomes} ₽</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.item, backgroundColor: RED }}>
        <View style={styles.column}>
          <Icon name="minus" size={40} color={WHITE} />
          <Text style={styles.text}>Траты</Text>
          <Text style={styles.text}>{percentExpenses}%</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>{totalExpenses} ₽</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    ...SHADOW,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 16,
    marginLeft: 7,
  },
});
