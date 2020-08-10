import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme, TextInput, Button } from 'react-native-paper';
import Regex from '../../utils/regex';
import Alerta from '../../components/alerta';
import { autenticarComIdSaude, salvarTokenDoUsuarioNoStorage, pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';

function FormularioLogin() {
  const navigation = useNavigation();
  const [temErro, alterarErro] = useState(false);
  const [email, alterarEmail] = useState('');
  const [senha, alterarSenha] = useState('');
  const [textoDoAlerta, alterarTextoDoAlerta] = useState('');
  const [visivel, alterarVisibilidade] = useState(false);
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

  const emailValido = () => Regex.EMAIL.test(email.toLowerCase());
  const senhaValido = () => senha.replace(/\s/g, '').length;

  const mostrarAlerta = async (texto) => {
    alterarTextoDoAlerta(texto);
    alterarVisibilidade(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        alterarVisibilidade(false);
        resolve();
      }, 2000);
    });
  };

  const fazerLogin = async () => {
    try {
      const response = await autenticarComIdSaude(email, senha);
      console.log('response', response);
      await salvarTokenDoUsuarioNoStorage(response.token);
      await mostrarAlerta('Usuário logado com sucesso');
      const token = await pegarTokenDoUsuarioNoStorage();
      console.log('token', token);
      navigation.navigate('HOME');
    } catch (err) {
      console.log(err.message);
      mostrarAlerta(err.message);
    }
  };

  return (
    <>
    <View style={{ marginHorizontal: 16 }}>
    <TextInput
      label="E-mail"
      mode="outlined"
      placeholder="E-mail"
      onChangeText={(textoEmail) => {
        alterarEmail(textoEmail);
        if (email.length > 1 && !emailValido()) {
          alterarErro(true);
          return;
        }
        alterarErro(false);
      }}
      theme={theme}
    />
     { temErro && <Text style={{ color: '#ffffff' }}> Insira um e-mail válido. </Text> }
     <TextInput
       style={{
         marginTop: 18
       }}
       onChangeText={textoSenha => alterarSenha(textoSenha)}
       theme={theme}
       label="Senha"
       placeholder="Senha"
       mode="outlined"
       secureTextEntry
     />
     <View style={{ marginTop: 18 }}>
      <Button
        disabled={!!(!emailValido() || !senhaValido())}
        style={{ ...estilos.botao, backgroundColor: '#ffffff' }}
        mode="contained"
        onPress={() => {
          fazerLogin();
        }}
      >
        Fazer Login
      </Button>
      <Button style={estilos.botao} onPress={() => navigation.navigate('webview', { title: 'Esqueci minha senha', url: 'https://dev.id.org.br/auth/realms/saude/login-actions/reset-credentials?client_id=account&tab_id=dj9hXjNndv8', idSaude: true })} mode="text" color="#ffffff"> Esqueci minha senha </Button>
     </View>
    </View>
    <Alerta textoDoAlerta={textoDoAlerta} visivel={visivel} />
    </>
  );
}

const estilos = StyleSheet.create({
  botao: { borderRadius: 200, marginHorizontal: 16, marginVertical: 10 },
});

export default FormularioLogin;
