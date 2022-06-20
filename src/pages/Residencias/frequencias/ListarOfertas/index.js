import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useEffect, useLayoutEffect } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { useOfertas } from '~/hooks/useOfertas';
import { ArrowLeftIcon } from '~/icons';
import OfertaItem from './OfertaItem';
import { ActivityIndicatorWrapper, Container, SubTitle, Title } from './styles';

const ListarOfertas = () => {
  const navigation = useNavigation();

  const { ofertas, featchOfertas, isLoading } = useOfertas();

  useEffect(() => {
    featchOfertas();
  }, []);

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
      <BarraDeStatus backgroundColor="#4CAF50" barStyle="light-content" />
      <Title>Frequências</Title>
      <SubTitle>Residência Multiprofissional</SubTitle>
      <FlatList
        data={ofertas.map(({ id, nome, inicio, fim }) => ({
          id,
          title: nome,
          inicio,
          fim,
        }))}
        keyExtractor={() => uniqueId('oferta')}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <OfertaItem oferta={item} />}
      />
    </Container>
  );
};

export default ListarOfertas;
