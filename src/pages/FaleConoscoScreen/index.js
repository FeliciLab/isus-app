import * as React from 'react';


import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ALERTA_FALTA_EPI } from './tiposDeOcorrencia';
import TipoDeOcorrenciaDropdown from './tiposDeOcorrenciaDropdown';
import FeedbackScreen from './feedback';
import AlertaDeEpi from './alertaDeEpi';

export default function FaleConoscoScreen({ route }) {
  const navigation = useNavigation();

  const mudarDeTela = tela => tela;

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
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, padding: 15 }}>
          <TipoDeOcorrenciaDropdown valorInicial={route.params.tela} valorAtual={mudarDeTela} />
          { mudarDeTela() === ALERTA_FALTA_EPI ? <AlertaDeEpi /> : <FeedbackScreen /> }
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
