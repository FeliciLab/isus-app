import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

function CartaoHome({ Icone, ativo, titulo, onPress, testID }) {
  if (ativo) {
    return (
      <Card
        elevation={4}
        style={styles.espacamento}
        onPress={onPress}
        testID={testID}>
        <Icone />
        <Card.Content>
          <Paragraph style={styles.paragrafo}>{titulo}</Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  espacamento: {
    margin: 10,
  },
  paragrafo: {
    fontSize: 12,
    letterSpacing: 0.25,
    lineHeight: 16,
    marginTop: 10,
    maxWidth: 112,
  },
});

export default CartaoHome;
