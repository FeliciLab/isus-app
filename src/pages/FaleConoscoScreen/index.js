/* eslint-disable max-len */
import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  View,
  Platform
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  ALERTA_FALTA_EPI, RELATAR_SUGESTAO, RELATAR_PROBLEMA, DEMANDA_EDUCACAO, DUVIDAS_ELMO
} from './tiposDeOcorrencia';
import DropdownSimples from './dropdown';
import FeedbackScreen from './feedback';
import AlertaFaltaDeEpiScreen from './alertaFaltaDeEpi';
import DemandaEducacao from './demandaEducacao';
import DuvidasElmo from './duvidasElmo';
import { FormProvider } from '../../context/FormContext';
import { cabecalhoMenuBusca } from '../../components/layoutEffect/cabecalhoLayout';

export default function FaleConoscoScreen({ route }) {
  const navigation = useNavigation();
  const [ocorrenciaAtual, alterarOcorrenciaAtual] = useState(
    route.params.ocorrencia
  );

  useFocusEffect(
    useCallback(() => alterarOcorrenciaAtual(route.params.ocorrencia), [])
  );

  const tiposDeOcorrencia = [
    { value: ALERTA_FALTA_EPI.textoDoDropdown },
    { value: RELATAR_SUGESTAO.textoDoDropdown },
    { value: RELATAR_PROBLEMA.textoDoDropdown },
    { value: DEMANDA_EDUCACAO.textoDoDropdown },
    { value: DUVIDAS_ELMO.textoDoDropdown }
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
    cabecalhoMenuBusca({
      navegador: navigation,
      titulo: ocorrenciaAtual.header,
      cor: 'verde'
    });
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#FFFFFF' }}
      extraScrollHeight={10}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
        <View style={{ flex: 1, padding: 15 }}>
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
