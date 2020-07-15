/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import {
  StyleSheet, View, Text, Platform
} from 'react-native';

function BarraInferior({
  telaDeOrigem, aoClicarEmBaixar, aoCompartilhar, conteudoBaixado, informacaoLateral
}) {
  const [iconeDownload, alterarIconeDownload] = useState();

  const telas = {
    descricao: 'descricao',
    manejo: {
      nome: 'manejo',
      informacaoLateral: () => (
        <>
          <Text style={estilos.texto}>
            versão 2.1.2
          </Text>
          <Text style={estilos.texto}>
            05/06/20
          </Text>
        </>
      )
    },
  };

  useEffect(() => {
    if (telaDeOrigem === telas.descricao) {
      if (conteudoBaixado) {
        return alterarIconeDownload('cloud-check');
      }
      return alterarIconeDownload('cloud-download');
    }
    return alterarIconeDownload('download');
  }, [conteudoBaixado]);


  return (
    <>
      <Appbar style={Platform.OS === 'ios' ? { ...estilos.inferior, ...estilos.safeAreaiOS } : { ...estilos.inferior }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <View style={{ marginVertical: 11 }}>
                  { informacaoLateral() }
              </View>
              <View style={{ flexDirection: 'row' }}>
                  { aoCompartilhar && <Appbar.Action icon="share-variant" onPress={aoCompartilhar} /> }
                  <Appbar.Action icon={iconeDownload} onPress={aoClicarEmBaixar} />
              </View>
          </View>
      </Appbar>
    </>
  );
}

const estilos = StyleSheet.create({
  inferior: {
    backgroundColor: '#FFFFFF',
    // shadowColor: '#000',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingHorizontal: 16
  },
  texto: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  }
});

export default BarraInferior;
