import React, { useLayoutEffect, useContext } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, View, Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '../../components/barraDeStatus';
import WizardContext, { WizardProvider } from '../../context/WizardContext';
import { FormProvider } from '../../context/FormContext';
// import FormularioInfoPessoal from './formularioInfoPessoal';
// import FormularioInfoProfissional from './formularioInfoProfissional';

function TelaDeCadastro() {
  const navigator = useNavigation();
  const { TelaAtual } = useContext(WizardContext);
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
            { TelaAtual }
        </View>
    </KeyboardAwareScrollView>
    </>
  );
}

export default function ConteudoTelaDeCadastro() {
  return (
    <FormProvider>
      <WizardProvider>
        <TelaDeCadastro />
      </WizardProvider>
    </FormProvider>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    fontSize: 24,
    marginTop: 40,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
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
