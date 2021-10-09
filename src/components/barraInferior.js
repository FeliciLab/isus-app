/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import { Appbar } from 'react-native-paper';
import {
  StyleSheet, View, Animated
} from 'react-native';

function BarraInferior({
  telaDeOrigem, aoClicarEmBaixar, aoCompartilhar, conteudoBaixado, informacaoLateral, barraVisivel
}) {
  const [iconeDownload, alterarIconeDownload] = useState();

  const telas = {
    descricao: 'descricao',
    manejo: 'manejo'
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


  const valorVisibilidade = useRef(new Animated.Value(0)).current;

  const mostrarBarra = () => {
    Animated.timing(valorVisibilidade, {
      toValue: 60,
      useNativeDriver: false,
      duration: 300
    }).start();
  };

  const EsconderBarra = () => {
    Animated.timing(valorVisibilidade, {
      toValue: 0,
      useNativeDriver: false,
      duration: 500
    }).start();
  };

  if (barraVisivel) {
    mostrarBarra();
  } else {
    EsconderBarra();
  }

  return (
    <>
      {
        <Animated.View style={{ opacity: valorVisibilidade, height: valorVisibilidade }}>
          <Appbar style={{ ...estilos.inferior }}>
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
        </Animated.View>
      }
    </>
  );
}

const estilos = StyleSheet.create({
  inferior: {
    backgroundColor: '#FFFFFF',
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
