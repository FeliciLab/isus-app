import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { CORES } from '~/constantes/estiloBase';
import Banner from '../Banner';

function BannerCarrossel({ banners }) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const { width } = useWindowDimensions();

  return (
    <View>
      <Carousel
        data={banners}
        renderItem={({ item }) => <Banner data={item} />}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={index => setActiveDotIndex(index)}
        autoplay
        autoplayInterval={5000}
        hasParallaxImages
      />
      <Pagination
        dotsLength={banners.length}
        dotColor={CORES.LARANJA}
        inactiveDotColor={CORES.PRETO_INATIVO}
        activeDotIndex={activeDotIndex}
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
    </View>
  );
}

export default BannerCarrossel;
