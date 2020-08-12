import React, { useLayoutEffect, useContext, useEffect } from 'react';
import {
  TouchableOpacity, StyleSheet, View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button, DefaultTheme } from 'react-native-paper';
import FormContext from '../../context/FormContext';
import Regex from '../../utils/regex';


export default function FormularioInfoPessoal() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const navigator = useNavigation();
  const {
    register, handleSubmit, setValue, errors
  } = useContext(FormContext);
  useEffect(() => {
    register('nomeCompleto', { required: true });
    register('email', { required: true, validate: email => emailValido(email) });
    register('telefone', { required: true, maxLenght: 11 });
    register('municipio', { required: true });
    register('cpf', { required: true, maxLenght: 11 });
  }, [register]);

  const emailValido = email => Regex.EMAIL.test(email.toLowerCase());

  const alteraValor = (campo, valor) => {
    setValue(campo, valor, { shouldvalidate: true });
    alteraBotaoAtivo(Object.entries(errors).length === 0);
    console.log('errors', Object.entries(errors).length);
  };

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
  const submit = (data) => { console.log('DATA', data); };

  return (
    <>
        <View style={{ marginHorizontal: 16 }}>
              <TextInput
                label="Nome Completo"
                name="nomeCompleto"
                underlineColor="#BDBDBD"
                onChangeText={text => alteraValor('nomeCompleto', text)}
                style={estilos.campoDeTexto}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="E-mail"
                name="email"
                keyboardType="email-address"
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('email', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="Telefone"
                name="telefone"
                keyboardType="number-pad"
                maxLength={11}
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('telefone', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="Município"
                name="municipio"
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('municipio', text)}
                mode="outlined"
                theme={theme}
              />
              <TextInput
                label="CPF"
                name="cpf"
                keyboardType="number-pad"
                maxLength={11}
                style={estilos.campoDeTexto}
                onChangeText={text => alteraValor('cpf', text)}
                mode="outlined"
                theme={theme}
              />
        </View>
        <Button
          style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
          onPress={handleSubmit(submit)}
          labelStyle={{ color: '#fff' }}
          mode="contained"
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
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  },

});
