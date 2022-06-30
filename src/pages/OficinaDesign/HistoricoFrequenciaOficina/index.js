import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { uniqueId } from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import CustonFAB from '~/components/CustonFAB';
import HistoricoEmBranco from '~/components/HistoricoEmBranco';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ArrowLeftIcon } from '~/icons';
import PresencaOfertaItem from './PresencaOfertaItem';
import {
  Container,
  PercentIndicator,
  SubTitle,
  Title,
  ActivityIndicatorWrapper
} from './styles';
import { useEspUserPresencas } from '~/hooks/useEspUserPresencas';
import useAutenticacao from '~/hooks/useAutenticacao';

const HistoricoFrequenciaOficina = () => {
  const navigation = useNavigation();

  const {
    params: { oficina },
  } = useRoute();

  const { user } = useAutenticacao();

  const { presencas, isLoading, fetchEspUserPresencas } = useEspUserPresencas(
    user.id,
    oficina.id,
  );

  useEffect(() => {
    fetchEspUserPresencas();
  }, []);

  const presencasPorOficina = useMemo(() => {
    const initialDate = moment(oficina.inicio);

    // min entre o dia atual e o fim da oferta
    const lastDate = moment.min(moment(), moment(oficina.fim));

    const diffDays = lastDate.diff(initialDate, 'days');

    const presenciables = [];

    for (let index = 0; index <= diffDays; index++) {
      const auxData = moment(initialDate).add(index, 'day');

      // desconsiderando sábado e domingo
      if ([1, 2, 3, 4, 5].some(item => item === auxData.day())) {
        presenciables.push({
          data: auxData,
        });
      }
    }

    return presenciables.reverse().map(({ data }) => ({
      data,
      isPresent: presencas.some(
        item =>
          moment(item.data).format('DD/MM/YYYY') ===
          moment(data).format('DD/MM/YYYY'),
      ),
    }));

  }, [presencas, oficina]);

  const percentualPresencas = useMemo(() => {
    const countIsPresent = presencasPorOficina.reduce((acc, curr) => {
      if (curr.isPresent) {
        acc++;
      }
      return acc;
    }, 0);

    const percent = countIsPresent / presencasPorOficina.length;

    return `${parseFloat(percent * 100).toFixed(1)}%`;
  }, [presencasPorOficina]);

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
      <Title>{oficina.title}</Title>
      <SubTitle>
        {moment(oficina.inicio).format('DD/MM')} a{' '}
        {moment(oficina.fim).format('DD/MM/YYYY')}
      </SubTitle>
      {presencas.length > 0 && (
        <PercentIndicator>
          Percentual de presença: {percentualPresencas}
        </PercentIndicator>
      )}
      <FlatList
        data={presencasPorOficina}
        keyExtractor={() => uniqueId('presenca')}
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
        onPress={() => navigation.navigate(rotas.OFICINA_DESIGN_HOME)}
      />
    </Container>
  );
};

export default HistoricoFrequenciaOficina;
