import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import BarraDeStatus from '../../components/barraDeStatus';
import { cabecalhoVoltar } from '../../components/layoutEffect/cabecalhoLayout';
import { CORES } from '../../constantes/estiloBase';
import randomKey from '../../utils/randomKey';
import CartaoDeConteudo from '../Home/MeusConteudos/CartaoDeConteudo';
import { CardSemConteudo, TextoCentralizado } from './styles';

export default function(props) {
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
