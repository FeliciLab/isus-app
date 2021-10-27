import React, { useLayoutEffect } from 'react';
import { CORES } from '../constantes/estiloBase';
import {
  cabecalhoVoltar,
  cabecalhoVoltarHome
} from './layoutEffect/cabecalhoLayout';
import { Botao, ScrollView, TextoCentralizado, TituloH6, View } from './style';

export default function SemConexao(props) {
  const { navigation } = props;
  const { route } = props;
  const tituloCabecalho = 'Sem Conexão';
  const corFundo = 'verde';

  const onPress = () => {
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
  }, []);

  return (
    <>
      <ScrollView>
        <View>
          <TituloH6>Sem conexão com a internet</TituloH6>
        </View>
        <View>
          <TextoCentralizado>
            Verifique se o wi-fi ou dados móveis estão ativos e tente novamente.
          </TextoCentralizado>
        </View>
        <View>
          <Botao labelStyle={{ color: CORES.LARANJA }} onPress={onPress}>
            VOLTAR
          </Botao>
        </View>
      </ScrollView>
    </>
  );
}
