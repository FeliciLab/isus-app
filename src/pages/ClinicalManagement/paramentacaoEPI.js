import React from 'react';
import {
  Text, View, Image, Linking, StyleSheet
} from 'react-native';
import BotaoManejoClinico from './botaoManejoClinico';
import Banner from '../../assets/images/banners/banner.png';

export default function ParamentacaoEPI() {
  return (
    <>
      <Text style={estilos.descricaoEPI}>
          Adotar todas as medidas para prevenção de contágio pela COVID-19
          por ocasião de atendimento, incluindo o uso correto dos EPIs disponibilizados.
      </Text>
      <View>
          <Image
            source={Banner}
            style={estilos.banner}
          />
          <BotaoManejoClinico label="confira orientações de paramentacao" onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/medidas-de-protecao/')} />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  descricaoEPI: { color: 'rgba(0, 0, 0, 0.6)', marginVertical: 16 },
  banner: {
    width: '100%',
    height: '100%',
    minHeight: 168,
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 5
  }
});
