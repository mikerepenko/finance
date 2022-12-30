import { useState, useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from './CarouselCardItem';

const data = [
  {
    title: 'Удобный дизайн',
    body: 'Вся неообходимая информациянаходитсянаглавном экране. Для добавления нового расхода или дохода нужно просто нажать на иконку',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'Отчет о финансах',
    body: 'Вы можете посмотреть подробную информацию о ваших доходах и расходах за любой период',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'История операций',
    body: 'Вы можете посмотреть полную историю доходов и расходов за определенный день',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
  {
    title: 'Конфиденциальность',
    body: 'В приложении можно поставить защиту, чтобы посторонние люди не могли получить к нему доступ',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
  {
    title: 'Копилка',
    body: 'Контролируйте количество откладываемых и изъятых средств из вашей копилки',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];

const CarouselCards = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <>
      {/* <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
        vertical={false}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      /> */}
    </>
  );
};

export default CarouselCards;
