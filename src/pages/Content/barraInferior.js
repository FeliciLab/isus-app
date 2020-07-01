import React from 'react';
import { Appbar } from 'react-native-paper';
import {
  StyleSheet, View, Text, Platform
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import formatarDataDePostagem from '../../utils/dateUtils';


function BarraInferior({ aoCompartilhar, dataDePostagem }) {
  SimpleLineIcons.loadFont();

  console.log('hello!');
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
                    <Appbar.Action icon="cloud-download" onPress={() => console.log('Pressed label')} />
                </View>
            </View>
        </Appbar>
    </>
  );
}

const estilos = StyleSheet.create({
  inferior: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    paddingHorizontal: 16,
  },
  texto: {
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  safeAreaiOS: {
    height: 80,
    paddingBottom: 20
  }
});

export default BarraInferior;
