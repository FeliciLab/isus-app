import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Snackbar } from 'react-native-paper';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import SelectModal from '~/components/SelectModal';
import { ocorrencias } from '~/constantes/ocorrencias';
import AlertarFaltaEPIFrom from './AlertarFaltaEPIFrom';
import DemandaEducacaoFrom from './DemandaEducacaoFrom';
import DuvidasElmoFrom from './DuvidasElmoFrom';
import RelatarProblemaFrom from './RelatarProblemaFrom';
import RelatarSujestaoFrom from './RelatarSujestaoFrom';

export default function FaleConosco() {
  const navigation = useNavigation();

  const route = useRoute();

  const { ocorrencia } = route.params;

  const [ocorrenciaSelectedId, setOcorrenciaSelectedId] = useState(
    ocorrencias[0].id,
  );

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [feedBackMessage, setFeedBackMessage] = useState('');

  const showFeedBackMessage = message => {
    setFeedBackMessage(message);
    setSnackbarVisible(true);
  };

  const renderForm = useCallback(() => {
    const forms = {
      RELATAR_PROBLEMA: (
        <RelatarProblemaFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      RELATAR_SUGESTAO: (
        <RelatarSujestaoFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      ALERTA_FALTA_EPI: (
        <AlertarFaltaEPIFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      DEMANDA_EDUCACAO: (
        <DemandaEducacaoFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      DUVIDAS_ELMO: (
        <DuvidasElmoFrom showFeedBackMessage={showFeedBackMessage} />
      ),
    };
    return forms[ocorrenciaSelectedId] ? (
      forms[ocorrenciaSelectedId]
    ) : (
      <RelatarProblemaFrom showFeedBackMessage={showFeedBackMessage} />
    );
  }, [ocorrenciaSelectedId]);

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: ocorrencias.find(item => item.id === ocorrenciaSelectedId)
        ?.header,
      cor: 'verde',
    });
  }, [ocorrenciaSelectedId]);

  useFocusEffect(
    useCallback(() => {
      if (ocorrencia) {
        setOcorrenciaSelectedId(ocorrencia.id);
      }
    }, []),
  );

  return (
    <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <KeyboardAwareScrollView
        extraScrollHeight={10}
        keyboardOpeningTime={100}
        enableOnAndroid
        enableAutomaticScroll={Platform.OS === 'ios'}>
        <View
          style={{
            padding: 15,
          }}>
          <SelectModal
            mode="outlined"
            deselectable={false}
            title="Tipo de ocorrência"
            value={ocorrenciaSelectedId}
            setValue={setOcorrenciaSelectedId}
            items={ocorrencias.map(item => ({
              value: item.id,
              label: item.label,
            }))}
          />
          {renderForm()}
        </View>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={snackbarVisible}
        duration={5000}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'ok',
          onPress: () => setSnackbarVisible(false),
        }}>
        {feedBackMessage}
      </Snackbar>
    </View>
  );
}
