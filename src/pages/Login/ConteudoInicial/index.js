import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { TESTIDS } from '../../../constantes/testIDs';
import {
  ConteudoDoTexto,
  Texto
} from './styles';
import { Botao } from '../styles';
import { analyticsData } from '../../../utils/analytics';

const ConteudoInicial = () => {
  const navigation = useNavigation();

  return (
    <>
      <ConteudoDoTexto>
        <Texto>
          O seu passaporte de acesso a todas as soluções digitais da
          Escola de Sáúde Pública do Ceará
        </Texto>
      </ConteudoDoTexto>
      <View>
        <Botao
          mode="contained"
          onPress={() => navigation.navigate('CADASTRO')}
        >
          Realizar meu cadastro
        </Botao>
        <Botao
          testID={TESTIDS.BUTTON_JA_POSSUO_ID_SAUDE}
          mode="text"
          color="#ffffff"
          onPress={() => {
            analyticsData('ja_possuo_id_saude', 'Click', 'Perfil');
            navigation.navigate('FORM_LOGIN');
          }}
        >
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
