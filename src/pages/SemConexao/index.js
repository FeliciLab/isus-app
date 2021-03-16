import React, { useLayoutEffect, useContext } from 'react';

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
import IconeSemConexaoVermelho from '../../assets/icons/sem_conexao_vermelho.svg';
import { SemConexaoContext, SemConexaoProvider } from '../../context/SemConexaoContext';

function SemConexao(props) {
  const { navigation } = props;
  const { route } = props;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';
  const { telaAtual } = useContext(SemConexaoContext);
  console.log(telaAtual.indice);

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
          {telaAtual.indice <= 2
            ? <IconeSemConexaoLaranja testID="icone-semconexao-imagem" />
            : <IconeSemConexaoVermelho />
          }

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

export default function NovoSemConexao(props) {
  return (
    <SemConexaoProvider>
      <SemConexao {...props} />
    </SemConexaoProvider>
  );
}
