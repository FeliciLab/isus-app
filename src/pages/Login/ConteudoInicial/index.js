import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import AppTrackTransparencyCard from '../../../components/AppTrackTransparencyCard';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import { TESTIDS } from '../../../constantes/testIDs';
import useAnalytics from '../../../hooks/Analytics';
import useDialogAppTrack from '../../../hooks/DialogAppTrack';
import useAppTrackTransparency from '../../../hooks/useAppTrackTransparency';
import { Botao } from '../styles';
import { ConteudoDoTexto, Texto } from './styles';

const ConteudoInicial = () => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const { exibirDialog } = useDialogAppTrack();

  const { isTrackingAuthorized } = useAppTrackTransparency();

  return (
    <>
      <ConteudoDoTexto>
        <Texto>
          O seu passaporte de acesso a todas as soluções digitais da Escola de
          Sáúde Pública do Ceará
        </Texto>
      </ConteudoDoTexto>
      <AppTrackTransparencyCard />
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
              navigation.navigate('CADASTRO');
            }
          }}
          disabled={!isTrackingAuthorized()}>
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
          disabled={!isTrackingAuthorized()}>
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
