import * as React from 'react';
import Carousel from 'react-native-snap-carousel';

export default function Carrossel({
  _carousel, data, _renderItem, sliderWidth, itemWidth
}) {
  return (
    <Carousel
      ref={_carousel}
      data={data}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
}
