import React from 'react';
import { CarrosselStyle } from './styles';

const Carrossel = ({ dados, aoRenderizarItem }) => (
  <CarrosselStyle
    horizontal
    data={dados}
    keyExtractor={item => String(item.id)}
    showsHorizontalScrollIndicator={false}
    renderItem={aoRenderizarItem}
  />
);

export default Carrossel;
