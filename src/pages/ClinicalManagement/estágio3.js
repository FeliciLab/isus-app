import React from 'react';
import {
  Text, View
} from 'react-native';

import { Paragraph } from 'react-native-paper';
import checkPlatform from '../../utils/PDF';
import Internação from './text-content/internacao-hospitalar.json';


const Estágio3 = ({ navigation }) => {
  const tópicos = [
    tópico1 => (
      <>
        <Paragraph>
          {tópico1.texto1}
          <Text style={{ fontWeight: 'bold' }}>
            {tópico1.destaque}
          </Text>
          {tópico1.texto2}
          <Text onPress={() => navigation.navigate('webview', { title: tópico1.link.título, url: tópico1.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{tópico1.link.texto}</Text>
        </Paragraph>
        {tópico1.itens.map(item => (
            <Paragraph>
              {item}
            </Paragraph>
        ))}
      </>
    ),
    tópico2 => (
      <Paragraph style={{ marginVertical: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>{tópico2.destaque}</Text>
      {tópico2.texto1}
      <Text onPress={() => (checkPlatform(tópico2.link.url, 'Restricao do uso do oseltamivir.pdf'))} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{tópico2.link.texto}</Text>
      {tópico2.texto2}
      </Paragraph>
    ),
    tópico3 => (
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>{tópico3.destaque}</Text>
        {tópico3.texto1}
      <Text onPress={() => navigation.navigate('webview', { title: tópico3.link.título, url: tópico3.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{tópico3.link.texto}</Text>
      </Paragraph>
    ),
    tópico4 => (
      <Paragraph>
        <Text style={{ fontWeight: 'bold' }}>{tópico4.destaque}</Text>
        {tópico4.texto1}
        <Text onPress={() => navigation.navigate('webview', { title: tópico4.link.título, url: tópico4.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{tópico4.link.texto}</Text>
      </Paragraph>
    ),
    tópico5 => (
      <Paragraph style={{ marginVertical: 8 }}>
        {tópico5.texto1}
        <Text style={{ fontWeight: 'bold' }}>{tópico5.destaque}</Text>
        <Text onPress={() => navigation.navigate('webview', { title: tópico5.link.título, url: tópico5.link.url })} style={{ textDecorationLine: 'underline', color: '#FF9800' }}>{ tópico5.link.text }</Text>
      </Paragraph>
    ),
    tópico6 => (
      <Paragraph>
        {tópico6.texto}
      </Paragraph>
    )

  ];

  return (
    <>
    <View style={{ marginTop: 20 }}>
      { tópicos.map((gerarTópico, index) => gerarTópico(Internação.tópicos[index]))}
    </View>
    </>
  );
};

export default Estágio3;
