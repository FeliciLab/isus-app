import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BarraDeStatus from '~/components/BarraDeStatus';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import { CORES } from '~/constantes/estiloBase';
import CardNewsElmo from '../CardNewsElmo';
import { CardSemConteudo, TextoCentralizado } from '../styles';

export default function NovidadesElmo(props) {
  const { route } = props;

  const { params } = route;

  const { conteudos } = params;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: 'Novidades Elmo',
      cor: 'indigo',
    });
  }, []);

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={conteudos}
          keyExtractor={() => uniqueId('item')}
          style={styles.listaDeConteudo}
          renderItem={({ item }) => <CardNewsElmo post={item} />}
        />
      );
    }
    return (
      <CardSemConteudo>
        <TextoCentralizado>
          Não há postagens salvas no seu dispositivo.
        </TextoCentralizado>
      </CardSemConteudo>
    );
  };

  return (
    <View style={styles.container}>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="light-content"
      />
      <ListaDeConteudo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
