import React, { useLayoutEffect } from 'react';
import {
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  TextoCentralizado,
  CardSemConteudo
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import { CORES } from '../../constantes/estiloBase';
import CartaoDeConteudo from '../Home/MeusConteudos/CartaoDeConteudo';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import randomKey from '../../utils/randomKey';

export default function (props) {
  const { route } = props;
  const { params } = route;
  const { conteudos } = params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    cabecalhoVoltar({
      navegador: navigation,
      titulo: 'Novidades Elmo',
      cor: 'indigo'
    });
  });

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
            alignSelf: 'center'
          }}
          renderItem={conteudo => (
            <CartaoDeConteudo
              key={randomKey()}
              conteudo={conteudo}
              cor={CORES.INDIGO_DYE}
              estiloBarra="dark-white"
            />
          )}
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
