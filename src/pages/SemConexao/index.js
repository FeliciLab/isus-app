import React, { useLayoutEffect, useContext, useEffect } from 'react';
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
import { TESTIDS } from '../../constantes/testIDs';

function SemConexao(props) {
  const { route } = props;
  const { params } = route;
  const formlogin = params?.formlogin || false;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';
  const { indice, mudarIndice } = useContext(SemConexaoContext);
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  useEffect(() => {
    if (formlogin) mudarIndice(3);
  }, [formlogin]);

  const onPressTentarNovamente = () => {
    mudarIndice(indice + 1);
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

      if (params?.componente === 'ELMO' || params?.componente === 'QUALIQUIZ') {
        navigation.navigate(params?.componente);
        return;
      }
      navigation.goBack();
    }
  };

  const onPressVoltar = () => navigation.navigate(rotas.HOME, { screen: 'Home' });

  useLayoutEffect(() => {
    if (!params?.goHome) {
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
          {(indice < 3)
            ? <IconeSemConexaoLaranja testID={TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_LARANJA} />
            : <IconeSemConexaoVermelho testID={TESTIDS.SEM_CONEXAO.ICONE_SEM_CONEXAO_VERMELHO} />
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
          {(indice < 3)
            ? (
              <>
                <Botao
                  testID={TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR}
                  labelStyle={{ color: CORES.LARANJA }}
                  onPress={onPressVoltar}
                >
                  VOLTAR
                </Botao>
                <Botao
                  testID={TESTIDS.SEM_CONEXAO.BOTAO_TENTAR_NOVAMENTE}
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
                testID={TESTIDS.SEM_CONEXAO.BOTAO_VOLTAR}
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
