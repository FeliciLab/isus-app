import React from 'react';
import { Cartao, Paragrafo } from './styles';

function itemCard({
  Icone, titulo, onPress, testID
}) {
  return (
    <Cartao elevation={4} onPress={onPress} testID={testID}>
      <Icone />
      <Cartao.Content>
        <Paragrafo>
          {titulo}
        </Paragrafo>
      </Cartao.Content>
    </Cartao>
  );
}

export default itemCard;
