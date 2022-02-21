import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { Container, Title, SubTitle } from './styles';
import { uniqueId } from 'lodash';
import OfertaItem from './OfertaItem';

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
      />
    </Container>
  );
};

export default ListarOfertas;
