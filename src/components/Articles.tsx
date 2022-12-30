import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { CLOUD, WHITE, YELLOW } from '../services/colors';
import { SHADOW } from '~/services/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/components/Navigation';
import { ArticleTypes } from '~/services/constants';
import { Article } from '~/types/models';
import { ARTICLES } from '~/services/articles';

type ArticlesProps = {
  articleType: ArticleTypes;
  screen?: string;
};

function Articles({
  articleType,
  screen = 'MainScreen',
}: ArticlesProps): JSX.Element {
  const navigation = useNavigation<NavigationProps>();

  const handleAdd = (item: Article) => {
    navigation.navigate('AddScreen', {
      articleType: articleType,
      title: item.title,
      nameIcon: item.nameIcon,
      color: item.color,
    });
  };

  return (
    <View style={styles.container}>
      {screen === 'MainScreen' && (
        <View style={styles.header}>
          <Text style={styles.textArticles}>Статьи</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticlesScreen', {
                articleType: articleType,
              })
            }>
            <Text style={styles.textAll}>Все</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.items}>
        {ARTICLES.filter(
          article => article.articleType === articleType,
        )
          .filter(
            (_, index) =>
              (screen === 'MainScreen' && index < 7) ||
              screen === 'ArticlesScreen',
          )
          .map(item => (
            <TouchableOpacity
              style={styles.item}
              key={item.id}
              onPress={() => handleAdd(item)}>
              <Icon
                name={item.nameIcon}
                size={40}
                color={item.color}
              />
              <Text style={styles.textItem}>{item.title}</Text>
            </TouchableOpacity>
          ))}

        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Icon name="plus" size={40} color={CLOUD} />
          <Text style={styles.textItem}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Articles;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  items: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: 80,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
    padding: 5,
    ...SHADOW,
    backgroundColor: WHITE,
  },
  textArticles: {
    marginBottom: 10,
  },
  textItem: {
    fontSize: 11,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textAll: {
    color: YELLOW,
  },
});
