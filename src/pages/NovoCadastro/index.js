import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BarraDeStatus from '~/components/barraDeStatus';

function TelaDeCadastro() {
  return (
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor="#FFF" />
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#FFF' }}
        extraScrollHeight={100}
        keyboardOpeningTime={100}
        enableOnAndroid
        enableAutomaticScroll={Platform.OS === 'ios'}
      />
    </>
  );
}

export default function ConteudoTelaDeCadastro() {
  return <TelaDeCadastro />;
}
