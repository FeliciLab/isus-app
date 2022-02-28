import { useNavigation, useRoute } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import moment from 'moment';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useUserPresencas } from '~/hooks/useUserPresencas';
import { ArrowLeftIcon } from '~/icons';
import HistoricoEmBranco from './HistoricoEmBranco';
import PresencaItem from './PresencaItem';
import {
  ActivityIndicatorWrapper,
  Container,
  HomeButton,
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

  const { presencas, featchUserPresencas, isLoading } = useUserPresencas(
    user.id,
    oferta.id,
  );

  useEffect(() => {
    featchUserPresencas();
  }, []);

  // TODO: ver como isso fica apresentado
  const daysOfOferta = () => {
    const initialDate = moment(oferta.inicio);

    const lastDate = moment(oferta.fim);

    const diffDays = lastDate.diff(initialDate, 'days');

    console.log({ diffDays });

    return presencas.map(({ data, turno }) => ({
      date: data,
      turn: turno,
      isPresent: true,
    }));
  };

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
        <PercentIndicator>Percentual de presença: 66,3%</PercentIndicator>
      )}
      <FlatList
        data={daysOfOferta()}
        keyExtractor={() => uniqueId('presenca')}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PresencaItem presenca={item} />}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 90 }} />}
        ListEmptyComponent={<HistoricoEmBranco />}
      />
      <HomeButton
        color="#fff"
        label="Home"
        small
        onPress={() => navigation.navigate(rotas.RESIDENCIA_MEDICA)}
      />
    </Container>
  );
};

export default HistoricoFrequencia;
