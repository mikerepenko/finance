import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { GREEN, RED } from '~/services/colors';
import { PeriodTypes } from '~/services/constants';
import { SHADOW } from '~/services/styles';
import { calculateTotal } from '~/services/utils';
import { Expense, Income } from '~/types/models';

type ChartProps = {
  expenses: Expense[];
  incomes: Income[];
};

const Chart = ({ expenses, incomes }: ChartProps) => {
  const screenWidth = Dimensions.get('window').width - 20;

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    backgroundColor: RED,
  };

  const totalExpenses = calculateTotal(expenses);
  const totalIncomes = calculateTotal(incomes);

  const chartData = [
    {
      name: '',
      population: totalIncomes,
      color: GREEN,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: '',
      population: totalExpenses,
      color: RED,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Остаток: {totalIncomes - totalExpenses} ₽
      </Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 10]}
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 10,
    ...SHADOW,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
