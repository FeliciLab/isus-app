import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import BarraDeStatus from '../../components/barraDeStatus';
import LoginApp from '../../assets/icons/login/login_app.svg';
import FormularioLogin from './formulario';

function Login({ route }) {
  const [possuiIDSaude, alterarPossuirIDSaude] = useState(route.params.possuiIDSaude);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...estilos.header
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'ID Saúde',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            if (possuiIDSaude) {
              alterarPossuirIDSaude(false);
            } else {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }
          }}
        >
          <Icon name={possuiIDSaude ? 'arrow-left' : 'menu'} size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  useFocusEffect(useCallback(() => {
    alterarPossuirIDSaude(route.params.possuiIDSaude);
  }, []));

  const ConteudoInicial = () => (
    <>
      <View style={estilos.conteudoTexto}>
        <Text style={estilos.texto}>
          Crie seu ID Saúde para ter acesso a conteúdos
          personalizados com seu perfil do iSUS!
        </Text>
      </View>
      <View>
        <Button style={{ ...estilos.botao, backgroundColor: '#ffffff' }} onPress={() => navigation.navigate('CADASTRO')} mode="contained"> Realizar meu cadastro </Button>
        <Button style={estilos.botao} mode="text" color="#ffffff" onPress={() => alterarPossuirIDSaude(true)}> Já possuo ID Saúde </Button>
      </View>
    </>
  );


  return (
    <>
    <BarraDeStatus barStyle="light-content" backgroundColor="#304FFE" />
      <SafeAreaView style={estilos.safeArea}>
        <ScrollView style={estilos.scroll}>
          <View style={estilos.conteudoImagem}>
            <LoginApp />
          </View>
          {
            possuiIDSaude ? <FormularioLogin navigation={navigation} /> : <ConteudoInicial />

          }
          <View style={estilos.conteudoTermoDeUso}>
            <Text style={estilos.termoDeUSo}>
            Ao continuar,
            você concorda com nossos
            {' '}
            <Text style={estilos.link} onPress={() => navigation.navigate('TERMOS_DE_USO')}>
              Termos de Uso
            </Text>
            {/* {' '}
            e
            {' '}
            <Text style={estilos.link} onPress={() => navigation.navigate('SOBRE')}>
              Política de Privacidade
            </Text> */}
            .
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  header: {
    backgroundColor: '#304FFE',
    elevation: 0,
    shadowOpacity: 0
  },
  safeArea: { flex: 1, backgroundColor: '#304FFE' },
  scroll: { flex: 1 },
  conteudoImagem: {
    marginVertical: 50, flexDirection: 'row', justifyContent: 'center'
  },
  conteudoTexto: { marginHorizontal: 16, marginBottom: 50 },
  texto: { color: '#ffffff', fontSize: 20 },
  botao: { borderRadius: 200, marginHorizontal: 16, marginVertical: 10 },
  conteudoTermoDeUso: { marginVertical: 30, marginHorizontal: 40 },
  termoDeUSo: { textAlign: 'center', color: 'white', fontSize: 12 },
  link: { textDecorationLine: 'underline' }
});
export default Login;
