import React from 'react';
import { View, Text } from 'react-native';

const SemPostagem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Não há postagens salvas no seu dispositivo.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: 'rgba(0,0,0,0.6)',
    marginTop: 20,
  },
});

export default SemPostagem;
