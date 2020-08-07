import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DefaultTheme, TextInput, Button } from 'react-native-paper';
import Regex from '../../utils/regex';


function FormularioLogin() {
  const navigation = useNavigation();
  const [temErro, alterarErro] = useState(false);
  const [email, alterarEmail] = useState('');
  const [senha, alterarSenha] = useState('');

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

  return (
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
      >
        Fazer Login
      </Button>
      <Button style={estilos.botao} onPress={() => navigation.navigate('webview', { title: 'Esqueci minha senha', url: 'https://www.google.com.br/', idSaude: true })} mode="text" color="#ffffff"> Esqueci minha senha </Button>
     </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  botao: { borderRadius: 200, marginHorizontal: 16, marginVertical: 10 },
});

export default FormularioLogin;
