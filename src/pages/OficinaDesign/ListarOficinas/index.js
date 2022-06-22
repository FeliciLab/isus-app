import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';
import { Container, Title } from './styles';

const ListarOficinas = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#59AAB8',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Oficinas',
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
      <BarraDeStatus backgroundColor="#59AAB8" barStyle="light-content" />
      <Title>Frequências</Title>
    </Container>
  );
};

export default ListarOficinas;
