import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

function CartaoDeServico({ Icone, titulo, onPress }) {
  return (
    <Card elevation={4} style={estilos.espacamento} onPress={onPress}>
      <Icone />
      <Card.Content>
        <Paragraph style={estilos.paragrafo}>
          { titulo }
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  espacamento: {
    margin: 10
  },
  paragrafo: {
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20,
    marginTop: 10
  }
});

export default CartaoDeServico;
