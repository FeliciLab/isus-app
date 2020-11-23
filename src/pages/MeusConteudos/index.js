import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity, View, StyleSheet, Text, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BarraDeStatus from '../../components/barraDeStatus';
import CartaoDeConteudo from './CartaoDeConteudo';

function MeusConteudos({ route }) {
  const navigation = useNavigation();
  const { conteudos } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Meus Conteúdos',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
    <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
       <ScrollView style={{ backgroundColor: '#ffffff', height: '100%' }}>
           <Text style={estilos.titulo}>
               Meus Conteúdos
           </Text>
           <View>
               {
                   conteudos.map(item => <CartaoDeConteudo conteudo={item} />)
               }
           </View>
       </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    color: '#000',
    fontSize: 24,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 16
  },
});

export default MeusConteudos;
