import React, { useContext } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BarraDeStatus from '~/components/barraDeStatus';
import { FormProvider } from '~/context/FormContext';
import WizardContext, { WizardProvider } from '~/context/WizardContext';

function TelaDeCadastro() {
  const { TelaAtual } = useContext(WizardContext);

  const textoDeApresentacao =
    'Vamos realizar seu cadastro, precisamos apenas de suas informações profissionais:';

  const textoDeTelaSenha =
    'Para finalizar seu cadastro, precisamos apenas de mais uma informação:';

  return (
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor="#304FFE" />
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#FFF' }}
        extraScrollHeight={100}
        keyboardOpeningTime={100}
        enableOnAndroid
        enableAutomaticScroll={Platform.OS === 'ios'}>
        <View style={{ marginHorizontal: 16 }}>
          {TelaAtual.indice === 2 ? (
            <Text style={estilos.apresentacao}>{textoDeTelaSenha}</Text>
          ) : (
            <Text style={estilos.apresentacao}>{textoDeApresentacao}</Text>
          )}
          {TelaAtual.tela}
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
    color: 'rgba(0, 0, 0, 0.87)',
  },
  campoDeTexto: {
    paddingBottom: 28,
    backgroundColor: '#FFF',
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD',
  },
});
