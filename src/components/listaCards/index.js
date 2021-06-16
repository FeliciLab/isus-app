import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Linking } from 'react-native';
import ROTAS from '../../constantes/rotas';
import ItemCard from './itemCard';

export default function ListaCards({ lista }) {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const onPress = (item) => {
    // analyticsData(item.id, 'Click', 'Elmo');
    if (!netInfo.isConnected) {
      if (item.tipo === 'webview') {
        navigation.navigate(ROTAS.SEM_CONEXAO, {
          componente: 'webview',
          title: item.titulo,
          url: item.valor,
        });
        return;
      }
      if (item.tipo === 'browser') {
        navigation.navigate(ROTAS.SEM_CONEXAO, {
          componente: 'browser',
          url: item.valor,
        });
        return;
      }
      if (item.tipo === 'rota') {
        navigation.navigate(ROTAS.SEM_CONEXAO, {
          componente: item.valor,
        });
        return;
      }
    }

    if (item.tipo === 'webview') {
      navigation.navigate('webview', {
        title: item.titulo,
        url: item.valor
      });
      return;
    }

    if (item.tipo === 'browser') {
      Linking.openURL(item.valor);
      return;
    }

    if (item.tipo === 'rota') {
      navigation.navigate(item.valor);
    }
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
        Icone={item.imagem}
        onPress={() => onPress(item)}
      />
      )}
    />
  );
}
