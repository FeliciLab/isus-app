import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import SvgDoacoes from '~/assets/images/notfound/no-data.svg';
import { CORES } from '~/constantes/estiloBase';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <SvgDoacoes />
      <Text style={styles.title}>Poxa, não há nada aqui!</Text>
      <Text style={styles.subTitle}>
        Esta página não existe ou sua versão do aplicativo pode estar
        desatualizada.
      </Text>
      <Button
        icon="reload"
        color={CORES.LARANJA}
        style={{ marginTop: 40 }}
        onPress={() => console.log('reload')}>
        Verificar atualizações
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 36,
  },
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.15,
    lineHeight: 24,
    color: '#141414',
  },
  subTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 24,
    color: '#666666',
  },
});

export default NotFound;
