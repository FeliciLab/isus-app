import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import Banner from './banner';

export default function Carrossel({ sliderWidth, itemWidth }) {
  const carouselItems = [
    {
      title: 'Item 1',
    }];

  function cardItem() {
    return (
      <Banner />
    );
  }

  return (
    <Carousel
      data={carouselItems}
      renderItem={cardItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
}
