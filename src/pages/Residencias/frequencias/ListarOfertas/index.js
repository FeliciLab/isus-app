import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-paper';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useOfertas } from '~/hooks/useOfertas';
import { ArrowLeftIcon } from '~/icons';
import OfertaItem from './OfertaItem';
import { Container, SubTitle, Title, ActivityIndicatorWrapper } from './styles';

const ListarOfertas = () => {
  const navigation = useNavigation();

  const { ofertas, featchOfertas, isLoading } = useOfertas();

  const { user } = useAutenticacao();

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

  // FIXME: Precisamos colocar aqui a validação para quando o usuãrio não está logado
  // TODO: melhorar essa parte
  if (!user) {
    return <Text>Vocẽ precisa estar logado para acessar essa tela</Text>;
  }

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
