import React, {
  useLayoutEffect, useState,
} from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBox from 'react-native-password-eye';
import { pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import { deletarUsuario } from '../../apis/apiCadastro';

export default function ExcluirPerfil() {
  const [senhaUsuario, alterarSenhaUsuario] = useState({});

  const excluirUsuario = async () => {
    const token = await pegarTokenDoUsuarioNoStorage();
    // console.log(token);
    // console.log({ senhaUsuario });
    deletarUsuario(senhaUsuario, token);
    // alert(senhaUsuario);
  };

  const navigation = useNavigation();
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#FF9800',
      accent: '#fff',
      text: '#000000',
      background: '#fff',
      placeholder: '#000000'
    }
  };

  const onChange = (text) => {
    console.log(text);
    alterarSenhaUsuario(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Exclusão de Perfil',
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
    <View style={estilos.alinharView}>
    <View style={estilos.primeiraDiv}>
        <Text style={estilos.title}>
        Para ter certeza de que você deseja excluir sua contar, por favor digite sua senha.
        </Text>
        <Text style={estilos.senha}>
            Senha:
        </Text>
        <TextInput
          onChangeText={text => onChange(text)}
          secureTextEntry
          theme={theme}
          style={estilos.inputSenha}
          mode="outlined"
          label="Senha"
        />
        <TextBox
          onChangeText={text => onChange(text)}
          placeholder="Senha"
          secureTextEntry
          theme={theme}
          inputStyle={estilos.inputSenha}
          mode="outlined"
        />
        <Button
          color="#F2453D"
          mode="contained"
          onPress={() => {
            excluirUsuario();
          }}
          labelStyle={{ color: 'white', fontSize: 18 }}
          style={{ width: 200, marginLeft: 20, borderRadius: 30 }}
        >
          EXCLUIR CONTA
        </Button>
    </View>

    <View style={estilos.segundaDiv} />
    </View>
    </>
  );
}

const estilos = StyleSheet.create({
  alinharView: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  primeiraDiv: {
    flex: 1,
  },
  segundaDiv: {
    flex: 1,
  },
  title: {
    marginLeft: 16,
    marginRight: 16,
    fontWeight: '400',
    fontSize: 24
  },
  senha: {
    marginLeft: 16,
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23
  },
  inputSenha: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderColor: 'black'
  }
});
