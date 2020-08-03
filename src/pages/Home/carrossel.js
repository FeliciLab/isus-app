import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import banners from './bannersDoCarrossel';

export default function Carrossel({ sliderWidth, itemWidth }) {
  const [indiceAtivo, alterarIndiceAtivo] = useState(0);

  function cardItem({ item }) {
    console.log(item.banner);
    return item.banner;
  }

  function paginacao() {
    return (
      <Pagination
        dotsLength={banners.length}
        dotColor="#FF9800"
        inactiveDotColor="#191919"
        activeDotIndex={indiceAtivo}
        dotStyle={{
          height: 12,
          width: 12,
          marginHorizontal: -3,
          borderRadius: 100
        }}
        inactiveDotScale={1}
        containerStyle={{
          marginTop: -35
        }}
        animatedDuration={10}
        animatedTension={100}
        delayPressInDot={50}
      />
    );
  }

  return (
    <>
      <Carousel
        data={banners}
        renderItem={cardItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={indice => alterarIndiceAtivo(indice)}
        autoplay
        autoplayInterval={5000}
        hasParallaxImages
      />
      { paginacao() }
    </>
  );
}
