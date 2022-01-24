import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import { TESTIDS } from '../../../constantes/testIDs';
import useAnalytics from '../../../hooks/Analytics';
import useDialogAppTrack from '../../../hooks/DialogAppTrack';
import { Botao } from '../styles';
import { ConteudoDoTexto, Texto } from './styles';

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
              navigation.navigate('CADASTRO');
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
            navigation.navigate('FORM_LOGIN');
          }}>
          Já possuo ID Saúde
        </Botao>
      </View>
    </>
  );
};

export default ConteudoInicial;
