import { useNavigation, useRoute } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import PresencaItem from './PresencaItem';
import {
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

  const presencas = [
    {
      date: 'Segunda-feira | 08/03/2022',
      turn: 'Manhã',
      isPresent: true, // residente esteve presente nessa data
    },
    {
      date: 'Terça-feira | 09/03/2022',
      turn: 'Manhã',
      isPresent: false,
    },
    {
      date: 'Quarta-feira | 10/03/2022',
      turn: 'Manhã',
      isPresent: true,
    },
    {
      date: 'Segunda-feira | 08/03/2022',
      turn: 'Manhã',
      isPresent: true,
    },
    {
      date: 'Terça-feira | 09/03/2022',
      turn: 'Manhã',
      isPresent: false,
    },
    {
      date: 'Quarta-feira | 10/03/2022',
      turn: 'Manhã',
      isPresent: true,
    },
    {
      date: 'Segunda-feira | 08/03/2022',
      turn: 'Manhã',
      isPresent: true,
    },
    {
      date: 'Terça-feira | 09/03/2022',
      turn: 'Manhã',
      isPresent: false,
    },
    {
      date: 'Quarta-feira | 10/03/2022',
      turn: 'Manhã',
      isPresent: true,
    },
  ];

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
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <Container>
      <Title>Histórico de frequência</Title>
      <SubTitle>
        {oferta.title} | {oferta.inicio} a {oferta.fim}
      </SubTitle>
      <PercentIndicator>Percentual de presença: 66,3%</PercentIndicator>
      <FlatList
        data={presencas}
        keyExtractor={() => uniqueId('presenca')}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PresencaItem presenca={item} />}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 90 }} />}
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
