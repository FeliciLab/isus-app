import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarBusca } from '../../apis/apiHome';
import useAnalytics from '../../hooks/Analytics';
import InfoPreview from './InfoPreview';
import ItemConteudo from './ItemConteudo';
import LegendaNaoEncontrada from './LegendaNaoEncontrada';
import LegendaPesquisando from './LegendaPesquisando';
import RodapeBusca from './RodapeBusca';
import {
  TextSearch,
  TouchableLeft,
  TouchableRight,
  ViewColumn
} from './styles';

const Buscar = props => {
  const { navigation } = props;

  const { analyticsData } = useAnalytics();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [busca, setBusca] = useState({ atual: '', antiga: '' });

  const [nadaEncontrado, setNadaEncontrado] = useState(false);

  navigation.setOptions({
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#4CAF50',
      elevation: 0,
      shadowOpacity: 0
    },

    headerTitle: () => (
      <TextSearch
        autoFocus
        placeholder="Buscar"
        placeholderTextColor="#FFFFFF"
        value={busca.atual}
        onChangeText={value => executarBusca(value)}
      />
    ),

    headerRight: () => (
      <TouchableRight mode="contained" onPress={() => loadRepositories()}>
        <></>
      </TouchableRight>
    ),

    headerLeft: () => (
      <TouchableLeft
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={28} color="#FFF" />
      </TouchableLeft>
    )
  });

  const loadRepositories = useCallback(async () => {
    await analyticsData('Home', 'Pesquisa', busca.atual);
    try {
      const response = await pegarBusca(busca.atual, page);
      if (response.data.data.length === 0) {
        setLoading(false);
        setNadaEncontrado(true);
        setData([]);
        return;
      }

      setNadaEncontrado(false);
      setData([...data, ...response.data.data]);
      setPage(page + 1);
    } catch (e) {
      console.log('Falha ao buscar', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const executarBusca = txt => {
    setLoading(true);
    setBusca({
      atual: txt,
      antiga: busca.antiga !== txt ? txt : busca.antiga
    });
    loadRepositories();
  };

  return (
    <ViewColumn>
      {busca.atual.length === 0 && <InfoPreview />}
      {busca.atual.length > 0 && loading && (
        <LegendaPesquisando palavra={busca.atual} />
      )}
      {busca.atual.length > 0 && !loading && (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={({ item }) => (
            <ItemConteudo item={item} navigation={navigation} />
          )}
          keyExtractor={item => String(item.id)}
          onEndReached={loadRepositories}
          onEndReachedThreshold={0.2}
          ListFooterComponent={(!loading && <RodapeBusca />) || <></>}
          ListEmptyComponent={nadaEncontrado && <LegendaNaoEncontrada />}
        />
      )}
    </ViewColumn>
  );
};

export default Buscar;
