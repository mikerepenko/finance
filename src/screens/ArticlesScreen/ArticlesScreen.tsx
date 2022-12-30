import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationProps, RouteProps } from '~/components/Navigation';
import { ArticleTypes } from '~/services/constants';
import { GREEN, WHITE } from '~/services/colors';
import Articles from '../../components/Articles';

function ArticlesScreen(): JSX.Element {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => {}}>
      //     <Icon name="edit" color={WHITE} size={25} />
      //   </TouchableOpacity>
      // ),
      title: `Статьи ${
        route.params?.articleType === ArticleTypes.Expenses
          ? 'расходов'
          : 'доходов'
      }`,
      headerStyle: {
        backgroundColor: GREEN,
      },
      headerTintColor: '#fff',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Articles
        articleType={route.params.articleType}
        screen="ArticlesScreen"
      />
    </View>
  );
}

export default ArticlesScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
});
