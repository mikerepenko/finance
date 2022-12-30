import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationProps, RouteProps } from '~/components/Navigation';
import { useTypedDispatch } from '~/hooks/redux';
import { ArticleTypes } from '~/services/constants';
import { GREEN, RED, WHITE } from '~/services/colors';
import { AddExpense } from '~/store/actions/expensesActions';
import { AddIncome } from '~/store/actions/incomesActions';
import { AddMoneybox } from '~/store/actions/moneyboxActions';
import Inputs from '../../components/Inputs';
import Keyboard from '../../components/Keyboard';

function AddScreen(): JSX.Element {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const [date, setDate] = useState(moment());
  const [sum, setSum] = useState(0);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" color={RED} size={25} />
        </TouchableOpacity>
      ),
      title:
        (route.params?.articleType === ArticleTypes.Expenses &&
          'Добавить расход') ||
        (route.params?.articleType === ArticleTypes.Incomes &&
          'Добавить доход') ||
        (route.params?.articleType === ArticleTypes.Moneybox &&
          `Копилка`),
      headerStyle: {
        backgroundColor: GREEN,
      },
      headerTintColor: '#fff',
    });
  }, []);

  const handleAdd = () => {
    const options = {
      id: moment().format(),
      date: moment().format(),
      color: route.params?.color,
      icon: route.params?.nameIcon,
      sum,
      articleType: route.params?.articleType,
      title: route.params?.title,
    };

    if (route.params?.articleType === ArticleTypes.Expenses) {
      dispatch(AddExpense(options));
    }

    if (route.params?.articleType === ArticleTypes.Incomes) {
      dispatch(AddIncome(options));
    }

    if (route.params?.articleType === ArticleTypes.Moneybox) {
      dispatch(AddMoneybox(options));
    }

    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.container}>
      <Inputs title={route.params?.title} sum={sum} date={date} />
      <Keyboard sum={sum} setSum={setSum} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAdd()}>
        <Text style={styles.text}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddScreen;

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 30,
  },
  text: {
    color: WHITE,
    fontSize: 18,
  },
});
