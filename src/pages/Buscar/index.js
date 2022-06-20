import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Divider } from 'react-native-paper';
import { pegarBusca } from '~/apis/apiHome';
import useAnalytics from '~/hooks/useAnalytics';
import useDebounce from '~/hooks/useDebounce';
import { ArrowLeftIcon } from '~/icons';
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

  const termoBuscaDebounced = useDebounce(termoBusca, 300);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitle: () => (
        <TextSearch
          autoFocus
          placeholder="Buscar"
          placeholderTextColor="#FFFFFF"
          onChangeText={value => setTermoBusca(value)}
        />
      ),
      headerLeft: () => (
        <TouchableLeft
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color="#FFF" />
        </TouchableLeft>
      ),
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
          data: { data, last_page },
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

  const renderListEmpty = () => {
    if (termoBuscaDebounced === '') return null;

    return !loading ? <LegendaNaoEncontrada /> : null;
  };

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
      <ViewColumn>
        {termoBuscaDebounced !== '' && loading && (
          <LegendaPesquisando palavra={termoBuscaDebounced} />
        )}
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          renderItem={({ item }) => (
            <ItemConteudo item={item} navigation={navigation} />
          )}
          keyExtractor={item => String(item.id)}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={renderListEmpty}
          ListFooterComponent={loading ? <RodapeBusca /> : null}
        />
      </ViewColumn>
    </TouchableWithoutFeedback>
  );
};

export default Buscar;
