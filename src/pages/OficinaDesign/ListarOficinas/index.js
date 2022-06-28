import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';
import OficinaItem from './OficinaItem';
import { ActivityIndicatorWrapper, Container, Title } from './styles';
import { useEspOfertas } from '~/hooks/useEspOfertas';

const ListarOficinas = () => {
  const navigation = useNavigation();

  const { ofertas, fetchEspOfertas, isLoading } = useEspOfertas();

  useEffect(() => {
    fetchEspOfertas();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.AZUL_OFICINA,
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

  if (isLoading) {
    return (
      <ActivityIndicatorWrapper>
        <ActivityIndicator size="large" />
      </ActivityIndicatorWrapper>
    );
  }

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <Title>Frequências</Title>
      <FlatList
        data={ofertas.map(({ id, nome, inicio, fim }) => ({
          id,
          title: nome,
          inicio,
          fim,
        }))}
        keyExtractor={({ id }) => String(id)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <OficinaItem oficina={item} />}
      />
    </Container>
  );
};

export default ListarOficinas;
