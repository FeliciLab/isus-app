import React, { useLayoutEffect, useContext } from 'react';
import { Linking } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

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
import rotas from '../../constantes/rotas';

function SemConexao(props) {
  const { route } = props;
  const { params } = route;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';
  const { telaAtual, alterarTelaAtual } = useContext(SemConexaoContext);
  const netInfo = useNetInfo();
  const navigation = useNavigation();


  const onPressTentarNovamente = () => {
    alterarTelaAtual({ indice: (telaAtual.indice + 1) });
    if (netInfo.isConnected) {
      if (params?.componente === 'webview') {
        navigation.navigate(params?.componente, {
          title: params?.title,
          url: params?.url,
          rota: params?.rota,
          idSaude: params?.idSaude,
          expanded: params?.expanded
        });
        return;
      }

      if (params?.componente === 'browser') {
        Linking.openURL(params?.url);
        return;
      }
      // eslint-disable-next-line no-unused-expressions
      params?.componente === 'ELMO' || params?.componente === 'QUALIQUIZ'
        ? navigation.navigate(params?.componente)
        : (navigation.goBack());
    }
  };

  const onPressVoltar = () => navigation.navigate(rotas.HOME);

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
          {telaAtual.indice <= 2
            ? (
              <>
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
              </>
            )
            : (
              <Botao
                testID="botão-semconexao-voltar"
                labelStyle={{ color: CORES.LARANJA }}
                onPress={onPressVoltar}
              >
                VOLTAR
              </Botao>
            )
          }
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
