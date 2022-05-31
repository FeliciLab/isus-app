import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import SelectModal from '~/components/SelectModal';
import AlertarFaltaEPIFrom from './AlertarFaltaEPIFrom';
import DemandaEducacaoFrom from './DemandaEducacaoFrom';
import DuvidasElmoFrom from './DuvidasElmoFrom';
import RelatarProbelmaFrom from './RelatarProbelmaFrom';
import RelatarSujestaoFrom from './RelatarSujestaoFrom';
import { Snackbar } from 'react-native-paper';

const ocorrencias = [
  'Relatar sugestão (iSUS)',
  'Relatar problema (iSUS)',
  'Demanda por Educação Permanente',
  'Dúvidas sobre o Elmo',
  'Alerta de falta de EPI',
];

// TODO: colocar o useRoute
export default function FaleConoscoScreen({ route }) {
  const navigation = useNavigation();

  const [ocorrenciaSelected, setOcorrenciaSelected] = useState(ocorrencias[0]);

  const [ocorrenciaAtual, alterarOcorrenciaAtual] = useState(
    route.params.ocorrencia,
  );

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [feedBackMessage, setFeedBackMessage] = useState('');

  const showFeedBackMessage = message => {
    setFeedBackMessage(message);
    setSnackbarVisible(true);
  };

  useFocusEffect(
    useCallback(() => alterarOcorrenciaAtual(route.params.ocorrencia), []),
  );

  const renderForm = () => {
    const forms = {
      'Relatar problema (iSUS)': (
        <RelatarProbelmaFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      'Relatar sugestão (iSUS)': (
        <RelatarSujestaoFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      'Alerta de falta de EPI': (
        <AlertarFaltaEPIFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      'Demanda por Educação Permanente': (
        <DemandaEducacaoFrom showFeedBackMessage={showFeedBackMessage} />
      ),
      'Dúvidas sobre o Elmo': <DuvidasElmoFrom />,
    };
    return forms[ocorrenciaSelected] ? (
      forms[ocorrenciaSelected]
    ) : (
      <RelatarProbelmaFrom showFeedBackMessage={showFeedBackMessage} />
    );
  };

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: ocorrenciaAtual.header,
      cor: 'verde',
    });
  }, []);

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
            title="Tipo de ocorrência"
            value={ocorrenciaSelected}
            setValue={setOcorrenciaSelected}
            items={ocorrencias.map(item => ({
              value: String(item),
              label: String(item),
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
