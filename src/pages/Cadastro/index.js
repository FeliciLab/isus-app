import React, { useLayoutEffect, useState } from 'react';
import {
  Text, TouchableOpacity, StyleSheet, View, Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button } from 'react-native-paper';

export default function TelaDeCadastro() {
  const navigator = useNavigation();
  const textoDeApresentacao = 'Vamos realizar seu cadastro, precisamos apenas de algumas informações';
  const [nomeCompleto, alterarNomeCompleto] = useState('');
  const [email, alterarEmail] = useState('');
  const [telefone, alterarTelefone] = useState('');
  const [municipio, alterarMunicipio] = useState('');
  const [cpf, alterarCPF] = useState('');


  useLayoutEffect(() => {
    navigator.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });
  return (
    <KeyboardAwareScrollView
      style={{ left: 16 }}

      extraScrollHeight={100}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
    >
        <Text style={estilos.apresentacao}>{textoDeApresentacao}</Text>
        <Text style={estilos.informacoesPessoais}>Informações Pessoais</Text>
        <View style={{ top: 200, width: 379 }}>
            <TextInput
              label="Nome Completo"
              style={estilos.campoDeTexto}
              mode="outlined"
              value={nomeCompleto}
              onChangeText={texto => alterarNomeCompleto(texto)}
            />
            <TextInput
              label="E-mail"
              style={estilos.campoDeTexto}
              mode="outlined"
              value={email}
              onChangeText={texto => alterarEmail(texto)}
            />
            <TextInput
              label="Telefone"
              style={estilos.campoDeTexto}
              mode="outlined"
              value={telefone}
              onChangeText={texto => alterarTelefone(texto)}
            />
            <TextInput
              label="Município"
              style={estilos.campoDeTexto}
              mode="outlined"
              value={municipio}
              onChangeText={texto => alterarMunicipio(texto)}
            />
            <TextInput
              label="CPF"
              style={estilos.campoDeTexto}
              mode="outlined"
              value={cpf}
              onChangeText={texto => alterarCPF(texto)}
            />
        </View>
        <Button
          style={estilos.botao}
          labelStyle={{ color: '#fff' }}
          mode="contained"
        >
            Enviar
        </Button>
    </KeyboardAwareScrollView>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    position: 'absolute',
    width: 379,
    top: 30,
    fontSize: 24,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  informacoesPessoais: {
    position: 'absolute',
    width: 202,
    top: 158,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  campoDeTexto: {
    paddingBottom: 15
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    left: 200,
    top: 200,
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'
  },

});
