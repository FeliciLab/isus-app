import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { CORES } from '../../../constantes/estiloBase';

export default function BannerCarrossel({ sliderWidth, itemWidth, banners }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  function cardItem({ item }) {
    return item.banner;
  }

  function paginacao() {
    return (
      <Pagination
        dotsLength={banners.length}
        dotColor={CORES.LARANJA}
        inactiveDotColor={CORES.PRETO_INATIVO}
        activeDotIndex={indiceAtivo}
        dotStyle={{
          height: 12,
          width: 12,
          marginHorizontal: -3,
          borderRadius: 100,
        }}
        inactiveDotScale={1}
        containerStyle={{
          marginTop: -35,
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
        onSnapToItem={indice => setIndiceAtivo(indice)}
        autoplay
        autoplayInterval={5000}
        hasParallaxImages
      />
      {paginacao()}
    </>
  );
}
