import React, {
  useLayoutEffect, useState
} from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { deletarUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';

export default function ExcluirPerfil() {
  const [palavra, alterarPalavra] = useState({});
  const [isvalidator, alterarisvalidator] = useState(true);
  const [corPrimariaSenha, alterarCorPrimariaSenha] = useState('#FF9800');
  const navigation = useNavigation();
  const estaFocado = useIsFocused();

  console.log(`estadoFocado: ${estaFocado}`);

  function converterTextoEmMinusculo(texto) {
    const textoEmMinusculo = texto.toLowerCase();
    return textoEmMinusculo;
  }

  const excluirUsuario = async () => {
    const palavraConvertida = converterTextoEmMinusculo(palavra);
    console.log(palavraConvertida);
    if (Object.keys(palavraConvertida).length === 0 || palavraConvertida !== 'excluir') {
      alterarisvalidator(false);
      alterarCorPrimariaSenha('#F2453D');
      setTimeout(() => {
        alterarCorPrimariaSenha('#FF9800');
        alterarisvalidator(true);
      }, 4000);
    } else {
      deletarUsuario()
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
    alterarPalavra(text);
  };

  // eslint-disable-next-line consistent-return
  const mostrarMensagemErro = (validar) => {
    // console.log({ validar });
    if (validar === false) {
      return (
        <Text style={estilos.infoErro}>
        Por favor, digite exatamente o texto EXCLUIR para confirmar a exclusão dos seus dados.
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
        Para confirmar a exclusão da sua conta no ID Saúde, digite EXCLUIR.
      </Text>
      <TextInput
        label="Confirmação de exclusão"
        autoFocus={estaFocado}
        onChangeText={text => onChange(text)}
        style={estilos.campoDeTexto}
        mode="outlined"
        theme={theme}
      />
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
  margem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  tituloDestaque: {
    fontWeight: 'normal',
    fontSize: 20,
    paddingTop: 24,
    marginLeft: 16,
    marginRight: 16,
  },
  campoDeTexto: {
    marginLeft: 16,
    marginRight: 16,
    borderColor: '#FF9800',
    paddingTop: 29,
    paddingBottom: 20
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 148,
    height: 48,
    marginRight: 16,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F2453D',
  },
  botaoExcluirConta: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500'
  },
  infoErro: {
    marginLeft: 16,
    marginRight: 16,
    color: '#FF0C3E',
    width: 342,
    height: 26,
    // backgroundColor: 'red'
  },
});
