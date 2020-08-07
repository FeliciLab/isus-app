import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity, StyleSheet
} from 'react-native';
import { DefaultTheme, Button, TextInput } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import BarraDeStatus from '../../components/barraDeStatus';
import LoginApp from '../../assets/icons/login/login_app.svg';

function Login({ route }) {
  const [possuiIDSaude, alterarPossuirIDSaude] = useState(route.params.possuiIDSaude);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#fff',
      accent: '#fff',
      background: 'transparent',
      text: '#fff',
      surface: '#fff',
      placeholder: '#fff'
    }
  };

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
              navigation.toggleDrawer();
            }
          }}
        >
          <Icon name={possuiIDSaude ? 'arrow-left' : 'menu'} size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  useFocusEffect(useCallback(() => {
    console.log('possuiIDSaude', possuiIDSaude);
    console.log('route.params.possuiIDSaude', route.params.possuiIDSaude);

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
        <Button style={{ ...estilos.botao, backgroundColor: '#ffffff' }} mode="contained"> Realizar meu cadastro </Button>
        <Button style={estilos.botao} mode="text" color="#ffffff" onPress={() => alterarPossuirIDSaude(true)}> Já possuo ID Saúde </Button>
      </View>
    </>
  );

  const FormularioLogin = () => (
    <View style={{ marginHorizontal: 16 }}>

      <TextInput
        label="E-mail"
        mode="outlined"
        placeholder="E-mail"
        theme={theme}
      />
       <TextInput
         style={{
           marginTop: 18
         }}
         theme={theme}
         label="Senha"
         placeholder="Senha"
         mode="outlined"
         secureTextEntry
       />
       <View style={{ marginTop: 18 }}>
        <Button style={{ ...estilos.botao, backgroundColor: '#ffffff' }} mode="contained"> Fazer Login </Button>
        <Button style={estilos.botao} mode="text" color="#ffffff"> Esqueci minha senha </Button>
       </View>
    </View>
  );

  return (
    <>
    <BarraDeStatus backgroundColor="#304FFE" />
      <SafeAreaView style={estilos.safeArea}>
        <ScrollView style={estilos.scroll}>
          <View style={estilos.conteudoImagem}>
            <LoginApp />
          </View>
          {
            possuiIDSaude ? <FormularioLogin /> : <ConteudoInicial />

          }
          <View style={estilos.conteudoTermoDeUso}>
            <Text style={estilos.termoDeUSo}>
            Ao continuar,
            você concorda com nossos
            {' '}
            <Text style={estilos.link} onPress={() => navigation.navigate('SOBRE')}>
              Termos de Uso
            </Text>
            {' '}
            e
            {' '}
            <Text style={estilos.link} onPress={() => navigation.navigate('SOBRE')}>
              Política de Privacidade
            </Text>
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
