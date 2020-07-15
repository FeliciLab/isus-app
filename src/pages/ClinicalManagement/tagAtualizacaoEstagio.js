import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TagAtualizacaoEstagio({ estagio, versaoManejo }) {
  const notificacao = (
    <View style={estilos.containerDaTag}>
      <Text style={estilos.textoDaTag}> ATUALIZADO </Text>
    </View>
  );

  const estagioComAtualizacao = () => versaoManejo && versaoManejo.modificacoes.includes(`estagio${estagio.id}`);

  const renderizarNotificacao = () => (estagioComAtualizacao() ? notificacao : <></>);

  return renderizarNotificacao();
}

const estilos = StyleSheet.create({
  containerDaTag: {
    borderRadius: 40,
    backgroundColor: 'rgba(242,69,61,0.12)',
    width: 100,
    padding: 1,
    textAlign: 'center',
    marginLeft: 8
  },
  textoDaTag: {
    color: '#F2453D',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.2,
    textAlign: 'center'
  }

});
