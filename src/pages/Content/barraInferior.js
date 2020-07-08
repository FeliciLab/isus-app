import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import {
  StyleSheet, View, Text, Platform
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import formatarDataDePostagem from '../../utils/dateUtils';


function BarraInferior({
  aoClicarEmBaixar, aoCompartilhar, dataDePostagem, conteudoBaixado
}) {
  const [iconeDownload, alterarIconeDownload] = useState();
  SimpleLineIcons.loadFont();

  useEffect(() => {
    if (conteudoBaixado) {
      alterarIconeDownload('cloud-check');
    } else {
      alterarIconeDownload('cloud-download');
    }
  }, [conteudoBaixado]);

  console.log();
  return (
    <>
        <Appbar style={Platform.OS === 'ios' ? { ...estilos.inferior, ...estilos.safeAreaiOS } : { ...estilos.inferior }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ marginVertical: 11 }}>
                    <Text style={estilos.texto}>
                        postado em
                    </Text>
                    <Text style={estilos.texto}>
                        {formatarDataDePostagem(dataDePostagem)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Appbar.Action icon="share-variant" onPress={aoCompartilhar} />
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
