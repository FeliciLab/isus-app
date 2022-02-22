import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import { Divider } from 'react-native-paper';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import OfertaItem from './OfertaItem';
// import OfertasListFooter from './OfertasListFooter/index';
import { Container, SubTitle, Title } from './styles';

const ListarOfertas = () => {
  const navigation = useNavigation();

  const ofertas = [
    {
      id: 1,
      title: 'Imersão 01',
      inicio: '07/03/2022',
      fim: '18/03/2022',
    },
    {
      id: 2,
      title: 'Imersão 02',
      inicio: '07/03/2022',
      fim: '18/03/2022',
    },
    {
      id: 3,
      title: 'Imersão 03',
      inicio: '07/03/2022',
      fim: '18/03/2022',
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
      <BarraDeStatus backgroundColor="#4CAF50" barStyle="light-content" />
      <Title>Frequências</Title>
      <SubTitle>Residência Multiprofissional</SubTitle>
      <FlatList
        data={ofertas}
        keyExtractor={() => uniqueId('oferta')}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <OfertaItem oferta={item} />}
        // ListFooterComponent={<OfertasListFooter />}
      />
    </Container>
  );
};

export default ListarOfertas;
