import React from 'react';
import {
  Text, View, Image, Linking, StyleSheet
} from 'react-native';
import BotaoManejoClinico from './botaoManejoClinico';
import Banner from '../../assets/images/banner.png';

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
          <BotaoManejoClinico label="consulte especialistas no tele-UTI" onPress={() => Linking.openURL('https://wa.me/5585984390220')} />
          <Text style={estilos.descricaoDiscussao}>
              Discussão de casos de pacientes críticos (UTI e emergências) com intensivistas e
              pneumologistas:
              {'\n'}
              <Text style={estilos.destaque}>seg a sex - 24h / sab e dom - 8h às 17h</Text>
          </Text>
      </View>
    </>
  );
}
const textColor = 'rgba(0,0,0,0.6)';
const estilos = StyleSheet.create({
  descricaoEPI: { color: 'rgba(0, 0, 0, 0.6)', marginVertical: 16 },
  banner: {
    width: '100%',
    height: '100%',
    minHeight: 168,
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 5
  },
  descricaoDiscussao: {
    color: textColor,
    marginVertical: 16
  },
  destaque: {
    fontWeight: 'bold'
  }
});
