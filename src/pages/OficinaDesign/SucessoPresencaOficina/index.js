import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ArrowLeftIcon } from '~/icons';
import { FABButton } from '~/pages/Residencias/frequencias/SucessoPresenca/styles';
import { Container, Title } from './styles';

const SucessoPresencaOficina = () => {
  const navigation = useNavigation();

  const {
    params: { oficina },
  } = useRoute();

  const { width } = Dimensions.get('window');

  const handleNavigateToHistoricoFrequencia = () =>
    navigation.navigate(rotas.OFICINA_DESIGN_HISTORICO_FREQUENCIA, { oficina });

  const handleNavigateToResidenciaMedica = () =>
    navigation.navigate(rotas.OFICINA_DESIGN_HOME);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.AZUL_OFICINA,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Oficina',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <AntDesign name="checkcircle" size={width * 0.3} color={CORES.VERDE} />
      <Title>Sua frequência foi salva com sucesso.</Title>
      <FABButton
        label="HISTÓRICO DE PRESENÇA"
        small
        onPress={handleNavigateToHistoricoFrequencia}
      />
      <FABButton
        label="Home"
        small
        onPress={handleNavigateToResidenciaMedica}
      />
    </Container>
  );
};

export default SucessoPresencaOficina;
