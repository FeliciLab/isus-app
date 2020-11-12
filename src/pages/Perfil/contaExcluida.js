import React, {
  useLayoutEffect
} from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import accountDelete from '../../assets/images/user_account_delete.png';
import BarraDeStatus from '../../components/barraDeStatus';

export default function ExcluirPerfil() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4054B2',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#4054B2',
      headerTitleAlign: 'center',
      headerTitle: ''
    });
  });
  return (
    <>
    <BarraDeStatus backgroundColor="#4054B2" barStyle="light-content" />
    <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 50, backgroundColor: '#4054B2' }} />
        <View style={{ height: 50, flex: 2, backgroundColor: '#4054B2' }}>
            <Image
              style={estilos.imagemUser}
              source={accountDelete}
            />
            <Text style={estilos.textoInfo}>
            Conta excluída com sucesso.
            Esta ação não pode ser desfeita, mas você pode criar novamente uma conta quando quiser.
            </Text>
            <Text style={estilos.textoInfo}>
            Esperamos que você retorne em breve.
            </Text>
            <Button
              color="#fff"
              mode="contained"
              style={estilos.botaoOk}
              onPress={() => navigation.navigate('LOGIN')}
            >
            OK
            </Button>
        </View>
        <View style={{ height: 50, backgroundColor: '#4054B2' }} />
    </View>
    </>
  );
}

const estilos = StyleSheet.create({
  imagemUser: {
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  textoInfo: {
    width: 378,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 32,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  botaoOk: {
    width: 145,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 48,
    marginTop: 37
  }
});
