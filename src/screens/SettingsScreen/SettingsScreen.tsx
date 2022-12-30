import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTypedDispatch } from '~/hooks/redux';
import { GREEN, RED, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';
import { GetExpenses } from '~/store/actions/expensesActions';
import { GetIncomes } from '~/store/actions/incomesActions';
import { GetMoneybox } from '~/store/actions/moneyboxActions';
import { CreateUser, GetUser } from '~/store/actions/userActions';

function SettingScreen(): JSX.Element {
  const dispatch = useTypedDispatch();

  return (
    <View style={styles.container}>
      {/* <View style={styles.section}>
        <Text style={styles.textHeader}>Статьи</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Редактировать статьи доходов</Text>
          <Icon name="arrowright" size={25} color={GREEN} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Редактировать статьи расходов</Text>
          <Icon name="arrowright" size={25} color={GREEN} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.textHeader}>Подписки</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Управление подписками</Text>
          <Icon name="arrowright" size={25} color={GREEN} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.textHeader}>Безопасность</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Добавить пароль</Text>
          <Icon name="arrowright" size={25} color={GREEN} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.section}>
        <Text style={styles.textHeader}>Полезная информация</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(
              'https://www.facebook.com/groups/1194463391101489/',
            );
          }}>
          <Text>Мы в FACEBOOK</Text>
          <Icon name="arrowright" size={25} color={GREEN} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonDelete} onPress={() => {
         dispatch(CreateUser());

         setTimeout(() => {
          dispatch(GetUser());
          dispatch(GetExpenses());
          dispatch(GetIncomes());
          dispatch(GetMoneybox());
        }, 1000)
      }}>
        <Text style={styles.textDelete}>Сбросить данные</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7,
  },
  section: {},
  button: {
    ...SHADOW,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 10,
  },
  textHeader: {
    marginTop: 10,
    marginBottom: 5,
  },
  buttonDelete: {
    marginTop: 20,
    alignItems: 'center',
  },
  textDelete: {
    color: RED,
  },
});
