import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import BarraDeStatus from '../../../components/barraDeStatus';
import { cabecalhoVoltar } from '../../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../../constantes/estiloBase';
import randomKey from '../../../utils/randomKey';
import { CardSemConteudo, TextoCentralizado } from '../styles';
import CardNewsElmo from '../CardNewsElmo';

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
          keyExtractor={() => `${randomKey()}`}
          style={{
            marginTop: 20,
            marginBottom: 12,
            flex: 1,
            alignSelf: 'center',
          }}
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
    <>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="light-content"
      />
      <ListaDeConteudo />
    </>
  );
}
