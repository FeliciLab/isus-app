import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarBusca } from '../../apis/apiHome';
import useAnalytics from '../../hooks/Analytics';
import useDebounce from '../../hooks/useDebounce';
import InfoPreview from './InfoPreview';
import ItemConteudo from './ItemConteudo';
import LegendaNaoEncontrada from './LegendaNaoEncontrada';
import LegendaPesquisando from './LegendaPesquisando';
import RodapeBusca from './RodapeBusca';
import { TextSearch, TouchableLeft, ViewColumn } from './styles';

const Buscar = props => {
  const { navigation } = props;

  const { analyticsData } = useAnalytics();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState(Number.POSITIVE_INFINITY);

  const [termoBusca, setTermoBusca] = useState('');

  const [termoBuscaAnterior, setTermoBuscaAnterior] = useState('');

  const termoBuscaDebounced = useDebounce(termoBusca, 1000);

  useLayoutEffect(() => {
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
          onChangeText={value => setTermoBusca(value)}
          onEndEditing={Keyboard.dismiss}
        />
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
  });

  useEffect(() => {
    if (termoBuscaDebounced !== '') {
      loadProjetos();
    } else {
      setData([]);
      setPage(1);
      setLastPage(Number.POSITIVE_INFINITY);
    }
  }, [termoBuscaDebounced, page]);

  const loadProjetos = async () => {
    if (page <= lastPage) {
      await analyticsData('Home', 'Pesquisa', termoBuscaDebounced);
      try {
        setLoading(true);

        if (termoBuscaDebounced !== termoBuscaAnterior) {
          setPage(1);
          setLastPage(Number.POSITIVE_INFINITY);
          setData([]);
        }

        const {
          data: { data, last_page }
        } = await pegarBusca(termoBuscaDebounced, page);

        if (termoBuscaDebounced !== termoBuscaAnterior) {
          setData(data);
        } else {
          setData(old => [...old, ...data]);
        }

        setLastPage(last_page);

        setTermoBuscaAnterior(termoBuscaDebounced);
      } catch (e) {
        console.log('Falha ao buscar', e);
      } finally {
        setLoading(false);
      }
    }
  };

  const onEndReached = () => {
    if (page < lastPage && termoBuscaDebounced === termoBuscaAnterior) {
      setPage(old => old + 1);
    }
  };

  const renderListFooter = () => {
    if (!loading) return null;

    return <RodapeBusca />;
  };

  const renderListEmpty = () => {
    if (termoBuscaDebounced === '') return null;

    return !loading ? <LegendaNaoEncontrada /> : null;
  };

  return (
    <ViewColumn>
      {termoBuscaDebounced !== '' && loading && (
        <LegendaPesquisando palavra={termoBuscaDebounced} />
      )}
      {termoBuscaDebounced === '' && !loading && <InfoPreview />}
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => (
          <ItemConteudo item={item} navigation={navigation} />
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderListFooter}
      />
    </ViewColumn>
  );
};

export default Buscar;
