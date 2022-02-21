import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Content, Title, Dates } from './styles';

const OfertaItem = ({ oferta, ...rest }) => {
  return (
    <Container {...rest}>
      <Content>
        <Title>{oferta.title}</Title>
        <Dates>
          {oferta.inicio} à {oferta.fim}
        </Dates>
      </Content>
      <Icon name="keyboard-arrow-right" size={24} />
    </Container>
  );
};

export default OfertaItem;
