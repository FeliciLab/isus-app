import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

function AlertaLogin({ visible = false, headerText, bodyText, ...rest }) {
  return (
    visible && (
      <View style={[styles.container, { marginTop: 16 }]} {...rest}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{headerText}</Text>
          <Text style={styles.body}>{bodyText}</Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 8,
    borderColor: CORES.VERMELHO,
    backgroundColor: CORES.AZUL,
  },
  textContainer: {
    marginLeft: 8,
  },
  header: {
    fontSize: 16,
    color: CORES.BRANCO,
    fontWeight: '800',
  },
  body: {
    fontSize: 12,
    color: CORES.BRANCO,
    fontWeight: '400',
  },
});

export default AlertaLogin;
