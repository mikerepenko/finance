import { View, StyleSheet, TouchableOpacity } from 'react-native';
import List from '~/components/List';
import { ArticleTypes } from '~/services/constants';
import { GREEN, RED, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/components/Navigation';
import { Moneybox as MonexbosType } from '~/types/models';

type MoneyboxProps = {
  articleType: ArticleTypes;
  transactions: MonexbosType[];
};

function Moneybox({
  articleType,
  transactions,
}: MoneyboxProps): JSX.Element {
  const navigation = useNavigation<NavigationProps>();

  const handleAdd = () => {
    navigation.navigate('AddScreen', {
      articleType: ArticleTypes.Moneybox,
      title: 'Пополнение',
      nameIcon: 'credit-card',
      color: GREEN,
    });
  };

  const handleDelete = () => {
    navigation.navigate('AddScreen', {
      articleType: ArticleTypes.Moneybox,
      title: 'Снятие',
      nameIcon: 'credit-card',
      color: RED,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete()}>
          <Icon name="minus" size={40} color={RED} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAdd()}>
          <Icon name="plus" size={40} color={GREEN} />
        </TouchableOpacity>
      </View>
      <List articleType={articleType} transactions={transactions} />
    </View>
  );
}

export default Moneybox;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  control: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 130,
  },
  button: {
    backgroundColor: WHITE,
    ...SHADOW,
    borderRadius: 30,
    height: 40,
  },
});
