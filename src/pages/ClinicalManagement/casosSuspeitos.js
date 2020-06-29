/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BotaoManejoClinico from './botaoManejoClinico';


export default function CasosSuspeitos(navigation) {
  const URLPlataformaNotificacao = 'https://coronavirus.ceara.gov.br/project/fichas-de-notificacao/';

  const URLDiretrizes = 'https://coronavirus.ceara.gov.br/project/diretrizes-para-diagnostico-e-tratamento-da-covid-19/';
  return (
        <View>
          <Text style={{ ...estilos.casosTitulo, ...estilos.corDoTexto }}>
            Notifique casos suspeitos de covid-19
          </Text>
          <Text style={estilos.corDoTexto}>
            Assegurar a notificação do caso,
            sua confirmação e inclusão em base de dados da
            vigilância epdemiológica e do registro eletrônico dos pacientes.
          </Text>
          <BotaoManejoClinico label="acesse a plataforma de notificação" onPress={() => navigation.navigate('manejoWebview', { title: 'Plataforma de notificação', url: URLPlataformaNotificacao })} />
          <Text
            onPress={() => navigation.navigate('manejoWebview', {
              title: 'Diretrizes',
              url: URLDiretrizes
            })}
            style={{ ...estilos.textoDiretrizes, ...estilos.corDoTexto }}
          >
            {' '}
              Diretrizes para diagnóstico e tratamento da COVID-19
          </Text>
        </View>
  );
}
const estilos = StyleSheet.create({
  casosTitulo: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 8
  },
  corDoTexto: {
    color: '#4054B2'
  },
  textoDiretrizes: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 30
  }
});
