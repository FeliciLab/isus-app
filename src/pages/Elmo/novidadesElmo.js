import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ScrollView,
  TextoCentralizado,
  CardSemConteudo
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import { CORES } from '../../constantes/estiloBase';
import CartaoDeConteudo from '../Home/MeusConteudos/CartaoDeConteudo';

export default function novidadesElmo(props) {
  const { route } = props;
  const { params } = route;
  const { conteudos } = params;
  const [temConteudo, alterarTemConteudo] = useState(false);
  console.log(`conteudos: ${conteudos}`);
  console.log(`conteudos size: ${conteudos.length}`);
  const navigation = useNavigation();

  useEffect(() => {
    const haConteudo = !!conteudos.length;
    alterarTemConteudo(haConteudo);
    console.log(`TemConteudo: ${temConteudo}`);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.INDIGO_DYE,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Novidades Elmo',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
            </TouchableOpacity>
      )
    });
  });

  const ListaDeConteudo = () => {
    if (conteudos && conteudos.length > 0) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={conteudos}
          keyExtractor={index => `${index}`}
          style={{
            flex: 1,
            alignSelf: 'center'
          }}
          renderItem={conteudo => (
            <CartaoDeConteudo conteudo={conteudo} cor={CORES.INDIGO_DYE} estiloBarra="dark-white" />
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
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 20, marginBottom: 12 }}>
          <ListaDeConteudo />
        </View>
      </ScrollView>
    </>
  );
}
