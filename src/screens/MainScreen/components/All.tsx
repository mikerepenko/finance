import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProps } from '~/components/Navigation';
import { YELLOW } from '~/services/colors';

function All(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonAll}
        onPress={() => navigation.navigate('HistoryScreen')}>
        <Text style={styles.textAll}>Посмотреть все расходы</Text>
      </TouchableOpacity>
    </View>
  );
}

export default All;

const styles = StyleSheet.create({
  container: {},
  buttonDelete: {
    marginLeft: 20,
  },
  buttonAll: {
    alignItems: 'center',
    marginTop: 10,
  },
  textAll: {
    color: YELLOW,
  },
});
