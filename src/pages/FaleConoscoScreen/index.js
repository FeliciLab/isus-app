import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import SelectModal from '~/components/SelectModal/index';
import AlertarFaltaEPIFrom from './AlertarFaltaEPIFrom/index';
import DemandaEducacaoFrom from './DemandaEducacaoFrom/index';
import DuvidasElmoFrom from './DuvidasElmoFrom/index';
import RelatarProbelmaFrom from './RelatarProbelmaFrom/index';
import RelatarSujestaoFrom from './RelatarSujestaoFrom/index';

const ocorrencias = [
  'Relatar sugestão (iSUS)',
  'Relatar problema (iSUS)',
  'Demanda por Educação Permanente',
  'Dúvidas sobre o Elmo',
  'Alerta de falta de EPI',
];

export default function FaleConoscoScreen({ route }) {
  const navigation = useNavigation();

  const [ocorrenciaSelected, setOcorrenciaSelected] = useState(ocorrencias[0]);

  const [ocorrenciaAtual, alterarOcorrenciaAtual] = useState(
    route.params.ocorrencia,
  );

  useFocusEffect(
    useCallback(() => alterarOcorrenciaAtual(route.params.ocorrencia), []),
  );

  const renderForm = () => {
    const forms = {
      'Relatar problema (iSUS)': <RelatarProbelmaFrom />,
      'Relatar sugestão (iSUS)': <RelatarSujestaoFrom />,
      'Alerta de falta de EPI': <AlertarFaltaEPIFrom />,
      'Demanda por Educação Permanente': <DemandaEducacaoFrom />,
      'Dúvidas sobre o Elmo': <DuvidasElmoFrom />,
    };
    return forms[ocorrenciaSelected] ? (
      forms[ocorrenciaSelected]
    ) : (
      <RelatarProbelmaFrom />
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
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFFFFF' }}
      extraScrollHeight={10}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}>
      <View style={{ flex: 1, padding: 15 }}>
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
  );
}
