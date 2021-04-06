import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BarraDeStatus from '../../components/barraDeStatus';
import IDSaudeBranco from '../../assets/icons/idsaude-branco.svg';
import { CORES } from '../../constantes/estiloBase';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import Termos from './Termos';
import {
  ConteudoImagem,
  SafeArea,
  Scroll,
  ChildrenView
} from './styles';

function IDSaudeLoginTemplate({ children }) {
  const navigation = useNavigation();

  useLayoutEffect(() => cabecalhoVoltar({
    title: '',
    navegador: navigation,
    cor: 'azul'
  }));

  return (
    <>
      <BarraDeStatus barStyle="light-content" backgroundColor={CORES.AZUL} />
      <SafeArea>
          <ConteudoImagem>
            <IDSaudeBranco />
          </ConteudoImagem>
        <Scroll>
          <ChildrenView>
            {children}
          </ChildrenView>
        </Scroll>

        <Termos />
      </SafeArea>
    </>
  );
}

export default IDSaudeLoginTemplate;
