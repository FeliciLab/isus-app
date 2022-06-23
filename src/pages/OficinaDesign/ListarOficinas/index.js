import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';
import OficinaItem from './OficinaItem';
import { Container, Title } from './styles';

const ListarOficinas = () => {
  const navigation = useNavigation();

  // TODO: criar o hook para buscar as oficinas cadastradas
  const oficinasMock = [
    {
      id: 1,
      nome: 'Oficina de Design de Serviços | ESP',
      inicio: moment().subtract(7, 'days'), // sete dias antes de hj
      fim: moment().add(7, 'days'), // sete dias depois de hj
    },
  ];

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

  return (
    <Container>
      <BarraDeStatus
        backgroundColor={CORES.AZUL_OFICINA_DARK}
        barStyle="light-content"
      />
      <Title>Frequências</Title>
      <FlatList
        data={oficinasMock.map(({ id, nome, inicio, fim }) => ({
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