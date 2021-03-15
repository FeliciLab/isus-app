import React, { useLayoutEffect } from 'react';

import { cabecalhoVoltar, cabecalhoVoltarHome }
  from '../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../constantes/estiloBase';
import {
  ScrollView,
  View,
  Botao,
  TextoCentralizado,
  TituloH6,
  CentralizarItensView
} from '../../components/style';
import IconeSemConexaoLaranja from '../../assets/icons/sem_conexao_laranja.svg';


export default function SemConexao(props) {
  const { navigation } = props;
  const { route } = props;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';

  const onPressTentarNovamente = () => {
    console.log('Tentar Novamente Pressionado');
  };
  const onPressVoltar = () => {
    if (!route.params?.goHome) {
      navigation.goBack();
    } else {
      navigation.navigate('HOME', { screen: 'Home' });
    }
  };

  useLayoutEffect(() => {
    if (!route.params?.goHome) {
      cabecalhoVoltar({
        navegador: navigation,
        titulo: tituloCabecalho,
        cor: corFundo
      });
    } else {
      cabecalhoVoltarHome({
        navegador: navigation,
        titulo: tituloCabecalho,
        cor: corFundo
      });
    }
  });

  return (
    <>
      <ScrollView>
        <CentralizarItensView marginTop="59px">
          <IconeSemConexaoLaranja testID="icone-semconexao-imagem" />
          <TituloH6>
            Sem conexão com a internet
          </TituloH6>
        </CentralizarItensView>
        <View>
          <TextoCentralizado>
            Verifique se o wi-fi ou dados móveis estão ativos e tente novamente.
          </TextoCentralizado>
        </View>
        <View>
          <Botao
            testID="botão-semconexao-voltar"
            labelStyle={{ color: CORES.LARANJA }}
            onPress={onPressVoltar}
          >
            VOLTAR
          </Botao>
          <Botao
            testID="botão-semconexao-voltar"
            labelStyle={{ color: CORES.BRANCO }}
            backgroundColor={CORES.LARANJA}
            onPress={onPressTentarNovamente}
          >
            TENTAR NOVAMENTE
          </Botao>
        </View>
      </ScrollView>
    </>
  );
}
