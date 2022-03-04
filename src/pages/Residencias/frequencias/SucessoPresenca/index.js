import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ArrowLeftIcon } from '~/icons';
import { Container, FABButton, Title } from './styles';

const SucessoPresenca = () => {
  const navigation = useNavigation();

  const {
    params: { oferta },
  } = useRoute();

  const { width } = Dimensions.get('window');

  const handleNavigateToHistoricoFrequencia = () =>
    navigation.navigate(rotas.HISTORICO_FREQUENCIA, { oferta });

  const handleNavigateToResidenciaMedica = () =>
    navigation.navigate(rotas.RESIDENCIA_MEDICA);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Residências em Saúde',
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

export default SucessoPresenca;
