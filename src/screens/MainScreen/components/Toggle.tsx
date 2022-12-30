import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GRAY, GREEN, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';
import { ArticleTypes } from '../../../services/constants';

type ToggleProps = {
  articleType: ArticleTypes;
  setArticleType: React.Dispatch<ArticleTypes>;
};

function Toggle({
  articleType,
  setArticleType,
}: ToggleProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setArticleType(ArticleTypes.Expenses)}
        // @ts-ignore
        style={styles.button(articleType, ArticleTypes.Expenses)}>
        <Text style={styles.text}>Расходы</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setArticleType(ArticleTypes.Incomes)}
        // @ts-ignore
        style={styles.button(articleType, ArticleTypes.Incomes)}>
        <Text style={styles.text}>Доходы</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setArticleType(ArticleTypes.Moneybox)}
        // @ts-ignore
        style={styles.button(articleType, ArticleTypes.Moneybox)}>
        <Text style={styles.text}>Копилка</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Toggle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  // @ts-ignore
  button: (articleType, currentArticleTypes) => ({
    backgroundColor:
      articleType === currentArticleTypes ? GREEN : GRAY,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    ...SHADOW,
  }),
  text: {
    color: WHITE,
    fontWeight: 'bold',
  },
});
