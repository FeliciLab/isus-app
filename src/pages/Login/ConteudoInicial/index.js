import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { TESTIDS } from '../../../constantes/testIDs';
import { ConteudoDoTexto, Texto } from './styles';
import { Botao } from '../styles';
import useAnalytics from '../../../hooks/Analytics';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import useDialogAppTrack from '../../../hooks/DialogAppTrack';
import useAppTrackTransparency from '../../../hooks/useAppTrackTransparency';

const ConteudoInicial = () => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { exibirDialog } = useDialogAppTrack();

  const {
    isTrackingAuthorized,
  } = useAppTrackTransparency();

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
              'Perfil'
            );
            if (!exibirDialog('o Cadastro')) {
              navigation.navigate('CADASTRO');
            }
          }}
          disable={!isTrackingAuthorized()}
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
          disable={!isTrackingAuthorized()}
        >
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
