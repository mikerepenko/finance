import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RED, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ArticleTypes } from '~/services/constants';
import { Expense, Income, Moneybox } from '~/types/models';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from './Navigation';
import { useTypedDispatch } from '~/hooks/redux';
import { DeleteExpense } from '~/store/actions/expensesActions';
import { DeleteIncome } from '~/store/actions/incomesActions';
import { DeleteMoneybox } from '~/store/actions/moneyboxActions';

type ListProps = {
  articleType: ArticleTypes;
  transactions: Expense[] | Income[] | Moneybox[];
};

function List({ articleType, transactions }: ListProps): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useTypedDispatch();

  const handleEdit = (item: Expense | Income | Moneybox) => {
    navigation.navigate('EditScreen', {
      sum: item.sum,
      title: item.title,
      date: item.date,
      articleType: item.articleType,
    });
  };

  const handleDelete = (item: Expense | Income | Moneybox) => {
    if (item.articleType === ArticleTypes.Expenses) {
      dispatch(DeleteExpense(item.id));
    }

    if (item.articleType === ArticleTypes.Incomes) {
      dispatch(DeleteIncome(item.id));
    }

    if (item.articleType === ArticleTypes.Moneybox) {
      dispatch(DeleteMoneybox(item.id));
    }
  };

  return (
    <View style={styles.container}>
      {transactions.map(transaction => (
        <TouchableOpacity
          style={styles.item}
          key={transaction.date}
          onPress={() => handleEdit(transaction)}>
          <View style={styles.column}>
            <Icon
              name={transaction.icon}
              size={30}
              color={transaction.color}
            />
            <Text style={styles.textArticle}>
              {transaction.title}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textSum}>{transaction.sum} ₽</Text>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => handleDelete(transaction)}>
              <Icon name="trash" size={25} color={RED} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      {!transactions.length && (
        <View style={styles.empty}>
          <Text>
            {articleType === ArticleTypes.Expenses &&
              'У вас нет расходов'}
            {articleType === ArticleTypes.Incomes &&
              'У вас нет доходов'}
            {articleType === ArticleTypes.Moneybox &&
              'Копилка пустая'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  textDate: {
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
    backgroundColor: WHITE,
    ...SHADOW,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArticle: {
    marginLeft: 10,
    fontSize: 16,
  },
  textSum: {},
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  buttonDelete: {
    marginLeft: 15,
  },
});
