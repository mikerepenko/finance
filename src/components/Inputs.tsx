import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { GREEN, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';

type InputsProps = {
  title: string;
  sum: number;
  date: moment.Moment;
};

function Input({ title, sum, date }: InputsProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Статья</Text>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.textInput}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Дата</Text>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.textInput}>
            {date.format('DD.MM.YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.item}>
        <Text style={styles.textTitle}>Сумма</Text>
        <TouchableOpacity style={styles.input}>
          <Text style={styles.textInput}>{sum}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  item: {
    marginBottom: 5,
  },
  input: {
    ...SHADOW,
    backgroundColor: WHITE,
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: GREEN,
    fontSize: 17,
  },
  textTitle: {
    marginBottom: 3,
  },
});
