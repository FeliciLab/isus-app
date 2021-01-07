import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BarraDeStatus from '../../components/barraDeStatus';
import {
  ScrollView, Texto, Titulo, Botao, Container
} from './styles';
import { CORES } from '../../constantes/estiloBase';

export default function capacitacaoElmo() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.INDIGO_DYE,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Elmo',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
            </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="white-content"
      />
      <ScrollView style={{ flex: 1 }}>
        <Titulo> Capacitação </Titulo>
        <Container>
          <Texto>
          {'O Elmo é um capacete de respiração assistida genuinamente cearense, não-invasivo e mais seguro para profissionais de saúde e pacientes. Criado em abril de 2020, o equipamento surgiu como um novo passo para o tratamento de pacientes com insuficiência respiratória aguda hipoxêmica, um dos efeitos da Covid-19.'}
          </Texto>
        </Container>
        <Botao

        // style={{
        // eslint-disable-next-line max-len
        //   marginTop: 22, marginHorizontal: 16, alignItems: 'center', backgroundColor: CORES.LARANJA,
        // }}
          backgroundColor={CORES.LARANJA}
          alignItems="center"
          marginTop={22}
          color={CORES.BRANCO}
          onPress={() => Linking.openURL('https://forms.gle/41wzW4KkczuDH35H8')
          }
        >
          Realizar Pré-Inscrição
        </Botao>
      </ScrollView>
    </>
  );
}
