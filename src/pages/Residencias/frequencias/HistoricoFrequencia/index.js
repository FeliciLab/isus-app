import { useNavigation, useRoute } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import CustonFAB from '~/components/CustonFAB/index';
import HistoricoEmBranco from '~/components/HistoricoEmBranco';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useUserPresencas } from '~/hooks/useUserPresencas';
import { ArrowLeftIcon } from '~/icons';
import PresencaItem from './PresencaItem';
import {
  ActivityIndicatorWrapper,
  Container,
  PercentIndicator,
  SubTitle,
  Title,
} from './styles';

const HistoricoFrequencia = () => {
  const navigation = useNavigation();

  const {
    params: { oferta },
  } = useRoute();

  const { user } = useAutenticacao();

  const { presencas, fetchUserPresencas, isLoading } = useUserPresencas(
    user.id,
    oferta.id,
  );

  useEffect(() => {
    fetchUserPresencas();
  }, []);

  const presecasPorOferta = useMemo(() => {
    const initialDate = moment(oferta.inicio);

    // min entre o dia atual e o fim da oferta
    const lastDate = moment.min(moment(), moment(oferta.fim));

    const diffDays = lastDate.diff(initialDate, 'days');

    const presenciables = [];

    for (let index = 0; index <= diffDays; index++) {
      const auxData = moment(initialDate).add(index, 'day');

      // desconsiderando sábado e domingo
      if ([1, 2, 3, 4, 5].some(item => item === auxData.day())) {
        presenciables.push({
          data: auxData,
          turno: 'manhã',
        });
        presenciables.push({
          data: auxData,
          turno: 'tarde',
        });
      }
    }

    return presenciables.reverse().map(({ data, turno }) => ({
      data,
      turno,
      isPresent: presencas.some(
        item =>
          moment(item.data).format('DD/MM/YYYY') ===
          moment(data).format('DD/MM/YYYY') && item.turno == turno,
      ),
    }));
  }, [presencas, oferta]);

  const percentualPresencas = useMemo(() => {
    const countIsPresent = presecasPorOferta.reduce((acc, curr) => {
      if (curr.isPresent) {
        acc++;
      }
      return acc;
    }, 0);

    const percent = countIsPresent / presecasPorOferta.length;

    return `${parseFloat(percent * 100).toFixed(1)}%`;
  }, [presecasPorOferta]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
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

  if (isLoading) {
    return (
      <ActivityIndicatorWrapper>
        <ActivityIndicator size="large" />
      </ActivityIndicatorWrapper>
    );
  }

  return (
    <Container>
      <Title>Histórico de frequência</Title>
      <SubTitle>
        {oferta.title} | {moment(oferta.inicio).format('DD/MM')} a{' '}
        {moment(oferta.fim).format('DD/MM/YYYY')}
      </SubTitle>
      {presencas.length > 0 && (
        <PercentIndicator>
          Percentual de presença: {percentualPresencas}
        </PercentIndicator>
      )}
      <FlatList
        data={presecasPorOferta}
        keyExtractor={() => uniqueId('presenca')}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PresencaItem presenca={item} />}
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

export default HistoricoFrequencia;
