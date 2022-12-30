import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 90;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

type ICarouselCardItem = {
  item: {
    imgUrl: string;
    title: string;
    body: string;
  };
  index: number;
};

const CarouselCardItem = ({ item, index }: ICarouselCardItem) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: ITEM_WIDTH,
    paddingBottom: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 400,
  },
  header: {
    color: '#222',
    fontFamily: 'open-bold',
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'open-regular',
    color: '#222',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    height: 100,
    textAlign: 'center',
  },
});

export default CarouselCardItem;
