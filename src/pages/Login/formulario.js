import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme, TextInput, Button } from 'react-native-paper';
import Regex from '../../utils/regex';
import Alerta from '../../components/alerta';
import { autenticarComIdSaude, salvarTokenDoUsuarioNoStorage, pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';

function FormularioLogin() {
  const navigation = useNavigation();
  const [temErro, alterarErro] = useState(false);
  const [carregando, alterarCarregando] = useState(false);
  const [email, alterarEmail] = useState('');
  const [senha, alterarSenha] = useState('');
  const [textoDoAlerta, alterarTextoDoAlerta] = useState('');
  const [visivel, alterarVisibilidade] = useState(false);
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#fff',
      accent: '#fff',
      text: '#fff',
      background: '#304FFE',
      placeholder: '#fff'
    }
  };

  useEffect(() => {
    if (email.length > 1 && !emailValido()) {
      alterarErro(true);
      return;
    }
    alterarErro(false);
  }, [email]);

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
    await autenticarComIdSaude(email, senha)
      .then(async (response) => {
        console.log(`Sucesso ${response.sucesso}`);
        await salvarTokenDoUsuarioNoStorage(response.mensagem);
        await pegarTokenDoUsuarioNoStorage();
        navigation.navigate('HOME');
      })
      .catch(err => mostrarAlerta(err.response.data.erros));
    alterarCarregando(false);
  };

  return (
    <>
    <View style={{ marginHorizontal: 16 }}>
    <TextInput
      label="E-mail"
      mode="outlined"
      placeholder="E-mail"
      selectionColor="#0000AB"
      value={email}
      onChangeText={textoEmail => alterarEmail(textoEmail)}
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
       selectionColor="#0000AB"
       placeholder="Senha"
       mode="outlined"
       secureTextEntry
     />
     <View style={{ marginTop: 18 }}>
      <Button
        disabled={!!(!emailValido() || !senhaValido())}
        style={{ ...estilos.botao, backgroundColor: '#ffffff' }}
        mode="contained"
        loading={carregando}
        onPress={() => {
          alterarCarregando(true);
          fazerLogin();
        }}
      >
        Fazer Login
      </Button>
      <Button style={estilos.botao} onPress={() => navigation.navigate('webview', { title: 'Esqueci minha senha', url: 'https://dev.id.org.br/auth/realms/saude/login-actions/reset-credentials?client_id=account', idSaude: true })} mode="text" color="#ffffff"> Esqueci minha senha </Button>
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
