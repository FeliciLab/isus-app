/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarBusca } from '../../apis/apiHome';
import useAnalytics from '../../hooks/Analytics';
import useDebounce from '../../hooks/useDebounce';
import InfoPreview from './InfoPreview';
import ItemConteudo from './ItemConteudo';
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

  const [lastPage, setLastPage] = useState(0);

  const [termoBusca, setTermoBusca] = useState('');

  const termoBuscaDebounced = useDebounce(termoBusca, 500);

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
        value={termoBusca}
        onChangeText={value => setTermoBusca(value)}
      />
    ),
    headerRight: () => (
      <TouchableRight mode="contained" onPress={() => loadProjetos()}>
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

  useEffect(() => {
    if (termoBuscaDebounced !== '') {
      loadProjetos();
    } else {
      setData([]);
    }
  }, [termoBuscaDebounced]);

  const loadProjetos = async () => {
    await analyticsData('Home', 'Pesquisa', termoBuscaDebounced);
    try {
      setLoading(true);

      const {
        data: { data, last_page }
      } = await pegarBusca(termoBuscaDebounced, page);

      setData(old => [...old, ...data]);

      setLastPage(last_page);
    } catch (e) {
      console.log('Falha ao buscar', e);
    } finally {
      setLoading(false);
    }
  };

  // Load more
  // const onEndReached = () => {
  //   console.log('onEndReached');
  //   setPage(old => old + 1);
  // };

  const renderListFooter = () => {
    if (!loading) return null;

    return <RodapeBusca />;
  };

  const renderListEmpty = () => {
    if (termoBusca === '') return null;

    return <InfoPreview />;
  };

  return (
    <ViewColumn>
      {/* {termoBusca === '' && <InfoPreview />} */}
      {/* {termoBusca.length === 0 && <InfoPreview />}
      {termoBusca.length > 0 && loading && (
        <LegendaPesquisando palavra={termoBusca} />
      )}
      {termoBusca.length > 0 && !loading && (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={({ item }) => (
            <ItemConteudo item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          onEndReached={loadProjetos}
          onEndReachedThreshold={0.2}
          ListFooterComponent={(!loading && <RodapeBusca />) || <></>}
          ListEmptyComponent={nadaEncontrado && <LegendaNaoEncontrada />}
        />
      )} */}

      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => (
          <ItemConteudo item={item} navigation={navigation} />
        )}
        keyExtractor={item => String(item.id)}
        // onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderListFooter}
      />

    </ViewColumn>
  );
};

export default Buscar;
