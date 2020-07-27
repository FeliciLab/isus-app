import React, { useCallback } from 'react';


import {
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ALERTA_FALTA_EPI, RELATAR_SUGESTAO, RELATAR_PROBLEMA } from './tiposDeOcorrencia';
import DropdownSimples from './dropdown';
import FeedbackScreen from './feedback';
import AlertaFaltaDeEpiScreen from './alertaFaltaDeEpi';


export default function FaleConoscoScreen({ route }) {
  const [ocorrenciaAtual, alterarOcorrenciaAtual] = React.useState(
    route.params.ocorrencia
  );
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => alterarOcorrenciaAtual(route.params.ocorrencia), [])
  );

  const tiposDeOcorrencia = [
    { value: ALERTA_FALTA_EPI.textoDoDropdown },
    { value: RELATAR_SUGESTAO.textoDoDropdown },
    { value: RELATAR_PROBLEMA.textoDoDropdown }
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
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
          { ocorrenciaAtual.textoDoDropdown === ALERTA_FALTA_EPI.textoDoDropdown
            ? <AlertaFaltaDeEpiScreen /> : <FeedbackScreen tipoDeFeedback={ocorrenciaAtual} /> }
        </View>
    </KeyboardAwareScrollView>
  );
}
