import React from 'react';
import { CarrosselStyle } from './styles';

const Carrossel = props => {
  const { dados, ...rest } = props;

  return (
    <CarrosselStyle
      horizontal
      data={dados}
      initialNumToRender={6}
      keyExtractor={item => String(item.id)}
      showsHorizontalScrollIndicator={false}
      {...rest}
    />
  );
};

export default Carrossel;
