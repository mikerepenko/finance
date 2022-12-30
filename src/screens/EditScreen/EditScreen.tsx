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
import { ArticleTypes } from '~/services/constants';
import { GREEN, RED, WHITE } from '~/services/colors';
import Inputs from '../../components/Inputs';
import Keyboard from '../../components/Keyboard';

function EditScreen(): JSX.Element {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const [date, setDate] = useState(moment(route.params?.date));
  const [sum, setSum] = useState(route.params?.sum);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" color={RED} size={25} />
        </TouchableOpacity>
      ),
      title: `Редактировать ${
        route.params?.articleType === ArticleTypes.Expenses
          ? 'расход'
          : 'доход'
      }`,
      headerStyle: {
        backgroundColor: GREEN,
      },
      headerTintColor: '#fff',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Inputs title={route.params?.title} sum={sum} date={date} />
      <Keyboard sum={sum} setSum={setSum} />

      <TouchableOpacity style={styles.buttonApply}>
        <Text style={styles.textApply}>Применить</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete}>
        <Text style={styles.textDelete}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {},
  buttonApply: {
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 30,
  },
  textApply: {
    color: WHITE,
    fontSize: 18,
  },
  buttonDelete: {
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 30,
  },
  textDelete: {
    color: WHITE,
    fontSize: 18,
  },
});
