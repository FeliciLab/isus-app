import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import { Snackbar } from 'react-native-paper';

function AlertaLogin({
  visible,
  duration,
  headerText = '',
  bodyText = '',
  ...rest
}) {
  return (
    <Snackbar
      wrapperStyle={{
        position: 'relative',
        // zIndex: 500,
      }}
      visible={visible}
      duration={duration}
      style={styles.snackbar}
      {...rest}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.body}>{bodyText}</Text>
      </View>
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 0, // borderRadius nulo para seguir o layout do figma
    margin: 0, // zerar margem padrão do estilo interno do SnackBar
    marginTop: 16,
    borderLeftWidth: 8,
    borderColor: CORES.VERMELHO,
    backgroundColor: CORES.AZUL,
    flexDirection: 'row-reverse',
    elevation: 0,
  },
  header: {
    marginTop: -16,
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
  },
  body: {
    marginBottom: -12,
    margin: 0,
    fontSize: 12,
    color: 'white',
    fontWeight: '400',
  },
  textContainer: {
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
  },
});

export default AlertaLogin;
