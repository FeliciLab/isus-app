import React, { useContext } from 'react';
import {
  View, Image, StyleSheet, Text
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ContextoDeVersaoDoManejo } from '../ClinicalManagement/contexto/contextoVersaoManejo';
import TagAtualizacao from '../ClinicalManagement/tagAtualizacao';

import IconPaciente from '../../assets/icons/icon_paciente.png';
import Carousel from './carrossel';

export default function Banner() {
  const navigation = useNavigation();
  const { versaoDoManejo, marcarVersaoComoLida } = useContext(ContextoDeVersaoDoManejo);

  const carouselItems = [{
    activeIndex: 0,
    carouselItems: [
      {
        title: 'Item 1',
        text: 'Text 1',
      },
      {
        title: 'Item 2',
        text: 'Text 2',
      },
      {
        title: 'Item 3',
        text: 'Text 3',
      },
      {
        title: 'Item 4',
        text: 'Text 4',
      },
      {
        title: 'Item 5',
        text: 'Text 5',
      }]
  }];

  function renderItem({ item }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
      }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>

    );
  }


  return (
    <>
    <Carousel
      layout="default"
      ref={carouselItems.carousel}
      data={carouselItems}
      sliderWidth={300}
      itemWidth={300}
      renderItem={renderItem}
    />

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
    </>
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
