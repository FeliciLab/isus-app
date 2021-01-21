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

const ConteudoInicial = ({ alterarPossuirIDSaude }) => {
  const navigation = useNavigation();

  return (
    <>
      <ConteudoDoTexto>
        <Texto>
          Crie seu ID Saúde para ter acesso a conteúdos
          personalizados com seu perfil do iSUS!
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
            alterarPossuirIDSaude(true);
            analyticsData();
          }}
        >
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
