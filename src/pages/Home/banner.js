import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ContextoDeVersaoDoManejo } from '../ClinicalManagement/contexto/contextoVersaoManejo';
import TagAtualizacao from '../ClinicalManagement/tagAtualizacao';

import IconPaciente from '../../assets/icons/icon_paciente.png';

export default function Banner() {
  const navigation = useNavigation();
  const { versaoDoManejo, marcarVersaoComoLida } = useContext(ContextoDeVersaoDoManejo);

  return (
    <Card
      onPress={() => {
        if (!versaoDoManejo.lida) {
          marcarVersaoComoLida();
        }
        navigation.navigate('clinical management');
      }}
      style={estilos.cartao}
    >
      <View
        style={estilos.conteudoCartao}
      >
        <View
          style={estilos.containerImage}
        >
          <Image source={IconPaciente} style={estilos.imagem} resizeMode="contain" />
        </View>
        <View style={estilos.conteudoTitulo}>
          <Paragraph style={estilos.titulo}>
            Manejo Clínico de Paciente com Covid-19
          </Paragraph>
          <TagAtualizacao versaoManejo={versaoDoManejo} />
        </View>
      </View>
    </Card>
  );
}


const estilos = StyleSheet.create({
  cartao: {
    marginVertical: 20,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#4054B2',
    minHeight: 130,
    alignContent: 'stretch'
  },
  conteudoCartao: {
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  containerImage: {
    height: 80,
    width: 80,
    borderRadius: 80
  },
  imagem: { height: 80, width: 80 },
  conteudoTitulo: {
    flex: 1, paddingHorizontal: 12
  },
  titulo: { fontSize: 18, color: '#FFEB3B' }
});
