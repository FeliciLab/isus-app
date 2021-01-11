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
          {'Neste momento, as ações de capacitação para uso do Elmo são realizadas na modalidade presencial, com priorização das unidades de saúde que já receberam o equipamento.'}
          {'\n\n'}
          {'A Escola de Saúde Pública está preparando uma formação híbrida (Presencial e EAD) que será ofertada a profissionais de saúde interessados. Clique no botão abaixo e deixe os seus contatos para receber uma notificação quando o curso estiver disponível.'}
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
