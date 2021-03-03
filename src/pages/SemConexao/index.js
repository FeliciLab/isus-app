import React, { useLayoutEffect } from 'react';

import { cabecalhoVoltar, cabecalhoVoltarHome }
  from '../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../constantes/estiloBase';
import {
  ScrollView,
  View,
  Botao,
  TextoCentralizado,
  TituloH6
} from '../../components/style';


export default function SemConexao(props) {
  const { navigation } = props;
  const { route } = props;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';

  // const onPress = () => {
  //   if (!route.params?.goHome) {
  //     navigation.goBack();
  //   } else {
  //     navigation.navigate('HOME', { screen: 'Home' });
  //   }
  // };

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
        <View>
          <TituloH6>
            Sem conexão com a internet
          </TituloH6>
        </View>
        <View>
          <TextoCentralizado>
            Verifique se o wi-fi ou dados móveis estão ativos e tente novamente.
          </TextoCentralizado>
        </View>
        <View>
          <Botao
            testID="botão-semconexao-voltar"
            labelStyle={{ color: CORES.LARANJA }}
          >
            ENTRAR
          </Botao>
        </View>
      </ScrollView>
    </>
  );
}
