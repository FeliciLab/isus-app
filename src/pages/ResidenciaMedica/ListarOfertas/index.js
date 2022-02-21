import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import OfertaItem from './OfertaItem';
import OfertasListFooter from './OfertasListFooter/index';
import { Container, SubTitle, Title } from './styles';

const ListarOfertas = () => {
  const navigation = useNavigation();

  const ofertas = [
    {
      title: 'Imersão 01',
      inicio: '07/03/2022',
      fim: '18/03/2022',
    },
    {
      title: 'Imersão 02',
      inicio: '07/03/2022',
      fim: '18/03/2022',
    },
    {
      title: 'Imersão 03',
      inicio: '07/03/2022',
      fim: '18/03/2022',
    },
  ];

  // TODO: implementar navegação para tela da Presença da oferta
  const handleOnPressOfertaItem = item => {
    console.log(JSON.stringify(item, undefined, 2));
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
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <OfertaItem
            oferta={item}
            onPress={() => handleOnPressOfertaItem(item)}
          />
        )}
        ListFooterComponent={<OfertasListFooter />}
      />
    </Container>
  );
};

export default ListarOfertas;
