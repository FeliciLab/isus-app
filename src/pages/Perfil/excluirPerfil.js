import React, {
  useLayoutEffect, useState
} from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { deletarUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';

export default function ExcluirPerfil() {
  const [senhaUsuario, alterarSenhaUsuario] = useState({});
  const [isvalidator, alterarisvalidator] = useState(true);
  const [corPrimariaSenha, alterarCorPrimariaSenha] = useState('#FF9800');
  const [mostrarSenha, alterarMostrarSenha] = useState(true);
  const navigation = useNavigation();

  const excluirUsuario = async () => {
    if (Object.keys(senhaUsuario).length === 0) {
      alterarisvalidator(false);
      alterarCorPrimariaSenha('#F2453D');
      setTimeout(() => {
        alterarCorPrimariaSenha('#FF9800');
        alterarisvalidator(true);
      }, 4000);
    } else {
      deletarUsuario(senhaUsuario)
        .then((value) => {
          if (value.status === 200) {
            navigation.navigate('CONTA_EXCLUIDA');
          }
        }).catch((error) => {
          console.log(error);
          alterarisvalidator(false);
          alterarCorPrimariaSenha('#F2453D');
          setTimeout(() => {
            alterarisvalidator(true);
            alterarCorPrimariaSenha('#FF9800');
          }, 4000);
        });
    }
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: corPrimariaSenha,
      accent: '#f1c40f',
      text: '#000000',
      background: '#fff',
      placeholder: '#000000'
    },
  };

  const onChange = (text) => {
    console.log(text.length);
    alterarSenhaUsuario(text);
  };

  // eslint-disable-next-line consistent-return
  const mostrarMensagemErro = (validar) => {
    console.log({ validar });
    if (validar === false) {
      return (
        <Text style={estilos.infoErro}>
        Senha Incorreta. Tente novamente ou click em esqueci a senha para redefini-la.
        </Text>
      );
    }
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
    <BarraDeStatus backgroundColor="#fff" barStyle="dark-content" />
    <View style={estilos.margem}>
      <Text style={estilos.tituloDestaque}>
        Para ter certeza de que você deseja excluir sua contar,
        por favor digite sua senha.
      </Text>
      <TextInput
        label="Senha"
        secureTextEntry={mostrarSenha}
        autoFocus="true"
        onChangeText={(text => onChange(text))}
        style={estilos.campoDeTexto}
        mode="outlined"
        theme={theme}
      />
      <Button
        onPress={() => (
          mostrarSenha ? alterarMostrarSenha(false) : alterarMostrarSenha(true)
        )}
      >
        Mostrar Senha
      </Button>
      {(isvalidator === false) ? mostrarMensagemErro(false) : mostrarMensagemErro(true)}
      <Button
        style={estilos.botaoHabilitado}
        mode="contained"
        labelStyle={estilos.botaoExcluirConta}
        onPress={() => {
          excluirUsuario();
        }}
      >
        EXCLUIR CONTA
      </Button>
    </View>
    </>
  );
}


const estilos = StyleSheet.create({
  tituloDestaque: {
    fontWeight: 'normal',
    fontSize: 24,
    paddingBottom: 24,
  },
  containerView: {
    backgroundColor: 'red',
    flex: 1
  },
  margem: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  campoDeTexto: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderColor: '#FF9800'
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 148,
    height: 48,
    marginTop: 54,
    marginRight: 16,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F2453D'
  },
  infoErro: {
    marginLeft: 25,
    marginRight: 16,
    color: '#FF0C3E',
    width: 342,
    height: 32
  },
  botaoExcluirConta: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500'
  }
});
