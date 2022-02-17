import React from 'react';
import { CarrosselStyle } from './styles';

const ListServices = props => {
  const { dados, ...rest } = props;

  return (
    <CarrosselStyle
      horizontal
      data={dados}
      keyExtractor={item => String(item.id)}
      showsHorizontalScrollIndicator={false}
      {...rest}
    />
  );
};

export default ListServices;
