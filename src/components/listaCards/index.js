import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Linking } from 'react-native';
import ROTAS from '../../constantes/rotas';
import ItemCard from './ItemCard';

export default function ListaCards({ lista }) {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const onPress = (item) => {
    // analyticsData(item.id, 'Click', 'Elmo');
    if (item.navegacao.net && !netInfo.isConnected) {
      navigation.navigate(ROTAS.SEM_CONEXAO);
      return;
    }

    if (item.navegacao.componente === 'browser') {
      Linking.openURL(item.navegacao.url);
      return;
    }

    navigation.navigate(item.navegacao.componente, {
      title: item.navegacao.titulo,
      url: item.navegacao.url,
      headerStyle: {
        backgroundColor: item.navegacao.background
      },
    });
  };

  return (
    <FlatList
      horizontal
      data={lista}
      keyExtractor={(items, index) => `${index}`}
      style={{
        flexDirection: 'row',
        alignSelf: 'center'
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
      <ItemCard
        testID={`cards-${item.id}`}
        key={item.id}
        ativo={item.ativo}
        titulo={item.titulo}
        Icone={item.icone}
        onPress={() => onPress(item)}
      />
      )}
    />
  );
}
