import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BarraDeStatus from '~/components/BarraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';
import CartaoDeConteudo from './CartaoDeConteudo';

function MeusConteudos({ route }) {
  const navigation = useNavigation();

  const { conteudos } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.BRANCO,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.PRETO,
      headerTitleAlign: 'center',
      headerTitle: 'Meus Conteúdos',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.VERDE} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: CORES.BRANCO, height: '100%' }}>
      <BarraDeStatus backgroundColor={CORES.BRANCO} barStyle="dark-content" />
      <Text style={styles.titulo}>Meus Conteúdos</Text>
      <View>
        {conteudos.map(item => (
          <CartaoDeConteudo key={String(item.id)} conteudo={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: CORES.PRETO,
    fontSize: 24,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 16,
  },
});

export default MeusConteudos;
