import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useLayoutEffect } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import CustonFAB from '~/components/CustonFAB';
import HistoricoEmBranco from '~/components/HistoricoEmBranco';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ArrowLeftIcon } from '~/icons';
import PresencaOfertaItem from './PresencaOfertaItem';
import { Container, PercentIndicator, SubTitle, Title } from './styles';

const presecasMock = [
  {
    id: 1,
    isPresent: true,
    data: new Date(),
  },
  {
    id: 2,
    isPresent: true,
    data: new Date(),
  },
  {
    id: 3,
    isPresent: false,
    data: new Date(),
  },
];

const HistoricoFrequenciaOficina = () => {
  const navigation = useNavigation();

  const {
    params: { oficina },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.AZUL_OFICINA,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: 'Oferta',
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
      <Title>Histórico de frequência</Title>
      <SubTitle>
        {oficina.title} | {moment(oficina.inicio).format('DD/MM')} a{' '}
        {moment(oficina.fim).format('DD/MM/YYYY')}
      </SubTitle>
      <PercentIndicator>Percentual de presença: 66%</PercentIndicator>
      <FlatList
        data={presecasMock}
        keyExtractor={({ id }) => String(id)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PresencaOfertaItem presenca={item} />}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 90 }} />}
        ListEmptyComponent={<HistoricoEmBranco />}
      />
      <CustonFAB
        label="Home"
        small
        onPress={() => navigation.navigate(rotas.RESIDENCIA_MEDICA)}
      />
    </Container>
  );
};

export default HistoricoFrequenciaOficina;
