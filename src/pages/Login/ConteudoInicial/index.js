import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import useDialogAppTrack from '~/hooks/useDialogAppTrack';
import { Botao, ConteudoDoTexto, Texto } from './styles';
import rotas from '~/constantes/rotas';


const ConteudoInicial = () => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { exibirDialog } = useDialogAppTrack();

  return (
    <>
      <ConteudoDoTexto>
        <Texto>
          O seu passaporte de acesso a todas as soluções digitais da Escola de
          Sáúde Pública do Ceará
        </Texto>
      </ConteudoDoTexto>
      <View>
        <Botao
          testID={TESTIDS.BUTTON_REALIZAR_CADASTRO}
          mode="contained"
          onPress={() => {
            analyticsData(
              labelsAnalytics.INICIAR_MEU_CADASTRO,
              'Click',
              'Perfil',
            );
            if (!exibirDialog('o Cadastro')) {
              navigation.navigate(rotas.CADASTRO);
            }
          }}>
          Realizar meu cadastro
        </Botao>
        <Botao
          testID={TESTIDS.BUTTON_JA_POSSUO_ID_SAUDE}
          mode="text"
          color="#ffffff"
          onPress={() => {
            analyticsData('ja_possuo_id_saude', 'Click', 'Perfil');
            navigation.navigate(rotas.LOGIN_FORM);
          }}>
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
