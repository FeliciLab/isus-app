import React from 'react';
import CarrosselStyle from './styles';

const Carrossel = ({ dados, aoRenderizarItem }) => (
  <CarrosselStyle
    horizontal
    data={dados}
    keyExtractor={(item, index) => `${index}`}
    showsHorizontalScrollIndicator={false}
    renderItem={aoRenderizarItem}
  />
);

export default Carrossel;
