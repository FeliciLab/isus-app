import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import IDSaudeBranco from '../../assets/icons/idsaude-branco.svg';
import BarraDeStatus from '../../components/barraDeStatus';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../constantes/estiloBase';
import { ChildrenView, ConteudoImagem, SafeArea, Scroll } from './styles';
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
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor={CORES.AZUL} />
      <SafeArea>
        <ConteudoImagem>
          <IDSaudeBranco />
        </ConteudoImagem>
        <Scroll>
          <ChildrenView>{children}</ChildrenView>
          <Termos />
        </Scroll>
      </SafeArea>
    </>
  );
}

export default IDSaudeLoginTemplate;
