import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { GREEN, WHITE } from '../../../services/colors';
import { NavigationProps } from '~/components/Navigation';

function Toolbar(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <Icon name="setting" size={30} color={GREEN} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => navigation.navigate('HistoryScreen')}>
          <Icon name="clockcircleo" size={28} color={GREEN} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => navigation.navigate('ReportScreen')}>
        <Icon name="calendar" size={25} color={WHITE} />
        <Text style={styles.text}>Отчет</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerLeft: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  buttonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
    borderRadius: 8,
    width: 80,
    height: 30,
  },
  text: {
    marginLeft: 5,
    color: WHITE,
  },
});
