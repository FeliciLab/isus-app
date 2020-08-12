import React, { useLayoutEffect, useContext, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button, DefaultTheme } from 'react-native-paper';
import FormContext from '../../context/FormContext';
// eslint-disable-next-line import/no-cycle
import WizardContext from '../../context/WizardContext';
import FormularioInfoProfissional from './formularioInfoProfissional';

export default function FormularioInfoPessoal() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };
  const navigator = useNavigation();
  const { register, setValue } = useContext(FormContext);
  const { alterarTelaAtual } = useContext(WizardContext);

  useEffect(() => {
    register('nomeCompleto', { required: true });
    register('email', { required: true });
    register('telefone', { required: true });
    register('municipio', { required: true });
    register('cpf', { required: true });
  }, [register]);

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
  // const submit = (data) => { console.log('DATA', data); };

  return (
    <>
        <View style={{ marginHorizontal: 16 }}>
              <TextInput
                label="Nome Completo"
                name="nomeCompleto"
                underlineColor="#BDBDBD"
                onChangeText={text => setValue('nomeCompleto', text)}
                style={estilos.campoDeTexto}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="E-mail"
                name="email"
                style={estilos.campoDeTexto}
                onChangeText={text => setValue('email', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="Telefone"
                name="telefone"
                style={estilos.campoDeTexto}
                onChangeText={text => setValue('telefone', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="Município"
                name="municipio"
                style={estilos.campoDeTexto}
                onChangeText={text => setValue('municipio', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="CPF"
                name="cpf"
                style={estilos.campoDeTexto}
                onChangeText={text => setValue('cpf', text)}
                mode="outlined"
                theme={theme}
              />
        </View>
        <Button
          style={estilos.botao}
          labelStyle={{ color: '#fff' }}
          mode="contained"
          onPress={() => alterarTelaAtual(<FormularioInfoProfissional />)}
        >
          Próximo
        </Button>
    </>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    fontSize: 24,
    marginTop: 40,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  informacoesPessoais: {
    fontWeight: '500',
    marginTop: 24,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15,
    paddingBottom: 16
  },
  campoDeTexto: {
    paddingBottom: 28,
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'
  },

});
