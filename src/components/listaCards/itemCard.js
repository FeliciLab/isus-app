import React from 'react';
import { Cartao, Paragrafo } from './styles';

function ItemCard({ Icone, ativo, titulo, onPress, testID }) {
  return (
    ativo && (
      <Cartao elevation={4} onPress={onPress} testID={testID}>
        {Icone}
        <Cartao.Content>
          <Paragrafo>{titulo}</Paragrafo>
        </Cartao.Content>
      </Cartao>
    )
  );
}

export default ItemCard;
