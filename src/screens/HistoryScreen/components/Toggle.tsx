import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ArticleTypes } from '~/services/constants';
import { GRAY, GREEN, WHITE } from '~/services/colors';
import { SHADOW } from '~/services/styles';

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
    </View>
  );
}

export default Toggle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 80,
  },
  text: {
    color: WHITE,
  },
  // @ts-ignore
  button: (articleType, clickedArticleType) => ({
    backgroundColor:
      articleType === clickedArticleType ? GREEN : GRAY,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    ...SHADOW,
  }),
});
