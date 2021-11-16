import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import IDSaudeBranco from '../../assets/icons/idsaude-branco.svg';
import BarraDeStatus from '../../components/barraDeStatus';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../constantes/estiloBase';
import { ChildrenView, Container, ConteudoImagem } from './styles';
import Termos from './Termos';

function IDSaudeLoginTemplate({ children }) {
  const navigation = useNavigation();

  useLayoutEffect(
    () =>
      cabecalhoVoltar({
        title: '',
        navegador: navigation,
        cor: 'azul'
      }),
    []
  );

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
      <Container>
        <BarraDeStatus barStyle="light-content" backgroundColor={CORES.AZUL} />
        <ConteudoImagem>
          <IDSaudeBranco />
        </ConteudoImagem>
        <ChildrenView>
          {children}
          <Termos />
        </ChildrenView>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default IDSaudeLoginTemplate;
