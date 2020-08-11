import React, { useLayoutEffect } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, View, Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '../../components/barraDeStatus';
import { FormProvider } from '../../context/FormContext';
import FormularioInfoPessoal from './formularioInfoPessoal';


export default function TelaDeCadastro() {
  const navigator = useNavigation();
  const textoDeApresentacao = 'Vamos realizar seu cadastro, precisamos apenas de algumas informações';

  useLayoutEffect(() => {
    navigator.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
    <BarraDeStatus barStyle="light-content" backgroundColor="#304FFE" />
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFF' }}
      extraScrollHeight={100}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
        <View style={{ marginHorizontal: 16 }}>
          <Text style={estilos.apresentacao}>{textoDeApresentacao}</Text>
          <Text style={estilos.informacoesPessoais}>Informações Pessoais</Text>
          <FormProvider>
            <FormularioInfoPessoal />
          </FormProvider>
        </View>
    </KeyboardAwareScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    fontSize: 24,
    marginTop: 40,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  informacoesPessoais: {
    fontWeight: '500',
    marginTop: 24,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15,
    paddingBottom: 16
  },
  campoDeTexto: {
    paddingBottom: 28,
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'
  },

});
