import React from 'react';
import {
  Text, View, Image, StyleSheet
} from 'react-native';

import {
  Paragraph
} from 'react-native-paper';
import UTI from './text-content/UTI.json';
import Pulmao from '../../assets/icons/estagiosManejo/pulmao.png';

const Estágio4 = ({ navigation }) => {
  const seções = [
    seção1 => (
      <>
        <Paragraph style={estilo.corDoTexto}>
          {seção1.texto1}
          <Text onPress={() => navigation.navigate('webview', { title: seção1.link.título, url: seção1.link.url })} style={estilo.link}>{seção1.link.text}</Text>
          {seção1.texto2}
        </Paragraph>
        <Paragraph style={estilo.corDoTexto}>
            {seção1.item.texto}
            <Text onPress={() => navigation.navigate('webview', { title: seção1.item.link.título, url: seção1.item.link.url })} style={estilo.link}>{seção1.item.link.texto}</Text>
        </Paragraph>
      </>
    ),
    seção2 => (
      <>
      <Paragraph style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        <Text style={estilo.destaque}>{seção2.destaque}</Text>
        {seção2.texto1}
        <Text
          onPress={() => navigation.navigate('webview', { title: seção2.link.título, url: seção2.link.url })}
          style={estilo.link}
        >
          {seção2.link.texto}
        </Text>
      </Paragraph>
      <View style={estilo.containerImagem}>
          <Image source={Pulmao} />
      </View>
      </>
    ),
    seção3 => (
      <Paragraph style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        <Text style={estilo.destaque}>
          {seção3.destaque}
        </Text>
        {seção3.texto1}
        <Text onPress={() => navigation.navigate('webview', { title: seção3.link.título, url: seção3.link.url })} style={estilo.link}>
        {seção3.link.texto}
        </Text>
      </Paragraph>
    ),
    seção4 => (
      <Text style={{ ...estilo.margin12, ...estilo.corDoTexto }}>
        {seção4.texto}
      </Text>
    )
  ];

  return (
    <>
      <View style={estilo.margin12}>
        { seções.map((gerarSeção, index) => gerarSeção(UTI.seções[index])) }
      </View>
    </>
  );
};

const estilo = StyleSheet.create({
  corDoTexto: { color: 'rgba(0, 0, 0, 0.6)' },
  margin12: { marginTop: 12 },
  destaque: { fontWeight: 'bold' },
  link: { color: '#F2453D', textDecorationLine: 'underline' },
  containerImagem: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }
});

export default Estágio4;
