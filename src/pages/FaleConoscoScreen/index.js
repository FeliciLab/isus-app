import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import SelectModal from '~/components/SelectModal/index';
import { FormProvider } from '~/context/FormContext';
import AlertaFaltaDeEpiScreen from './alertaFaltaDeEpi';
import DemandaEducacao from './demandaEducacao';
import DropdownSimples from './dropdown';
import DuvidasElmo from './duvidasElmo';
import FeedbackScreen from './feedback';
import {
  ALERTA_FALTA_EPI,
  DEMANDA_EDUCACAO,
  DUVIDAS_ELMO,
  RELATAR_PROBLEMA,
  RELATAR_SUGESTAO,
} from './tiposDeOcorrencia';

const ocorrencias = [
  'Relatar problema (iSUS)',
  'Relatar sugestão (iSUS)',
  'Alerta de falta de EPI',
  'Demanda por Educação Permanente',
  'Dúvidas sobre o Elmo',
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

  const tiposDeOcorrencia = [
    { value: ALERTA_FALTA_EPI.textoDoDropdown },
    { value: RELATAR_SUGESTAO.textoDoDropdown },
    { value: RELATAR_PROBLEMA.textoDoDropdown },
    { value: DEMANDA_EDUCACAO.textoDoDropdown },
    { value: DUVIDAS_ELMO.textoDoDropdown },
  ];

  function TipoDoDropdown({ tipo }) {
    if (tipo === ALERTA_FALTA_EPI.textoDoDropdown) {
      return <AlertaFaltaDeEpiScreen />;
    }

    if (tipo === DEMANDA_EDUCACAO.textoDoDropdown) {
      return <DemandaEducacao />;
    }

    if (tipo === DUVIDAS_ELMO.textoDoDropdown) {
      return (
        <FormProvider>
          <DuvidasElmo />
        </FormProvider>
      );
    }

    return <FeedbackScreen tipoDeFeedback={ocorrenciaAtual} />;
  }

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
        <DropdownSimples
          label="Tipo de ocorrência"
          dados={tiposDeOcorrencia}
          valorInicial={ocorrenciaAtual}
          aoMudarValor={ocorrencia => alterarOcorrenciaAtual(ocorrencia)}
        />
        <TipoDoDropdown tipo={ocorrenciaAtual.textoDoDropdown} />
      </View>
    </KeyboardAwareScrollView>
  );
}
