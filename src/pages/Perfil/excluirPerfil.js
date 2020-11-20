import React, {
  useLayoutEffect, useState, useRef, useEffect
} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  AppState,
  BackHandler
} from 'react-native';
import {
  TextInput, DefaultTheme, Button
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { deletarUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';
import { logout } from '../../apis/apiKeycloak';
import {
  pegarTokenDoUsuarioNoStorage,
  excluirTokenDoUsuarioNoStorage
} from '../../services/autenticacao';

export default function ExcluirPerfil() {
  const [palavra, alterarPalavra] = useState({});
  const [isvalidator, alterarisvalidator] = useState(true);
  const [corPrimariaSenha, alterarCorPrimariaSenha] = useState('#FF9800');
  const navigation = useNavigation();
  const refEntradaTexto = useRef(null);
  const appState = useRef(AppState.currentState);
  let estaConectado = true;
  const estaFocado = true;

  const realizarLogout = () => {
    try {
      const token = pegarTokenDoUsuarioNoStorage();
      // console.log(token);
      logout(token);
    } catch (err) {
      console.log('erro', err);
    }
    excluirTokenDoUsuarioNoStorage();
  };

  const excluirUsuario = () => {
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log('Connection type', state.type);
      estaConectado = state.isConnected;
      // console.log('Esta conectado?', estaConectado);
    });
    if (!estaConectado) {
      refEntradaTexto.current.clear();
      Alert.alert(
        'Sem conexão com a internet',
        'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        [{
          text: 'OK',
          onPress: () => { navigation.navigate('HOME'); }
        }]
      );
    }

    if (Object.keys(palavra).length !== 0 && palavra === 'EXCLUIR') {
      deletarUsuario()
        .then((value) => {
          if (value.status === 200) {
            realizarLogout();
            navigation.navigate('CONTA_EXCLUIDA');
          }
        }).catch((error) => {
          console.log(error);
          // if (error.isFatal) {
          //   console.log(`Error is fatal and is a: ${error.message}`);
          // }
          alterarisvalidator(false);
          alterarCorPrimariaSenha('#F2453D');
          setTimeout(() => {
            alterarisvalidator(true);
            alterarCorPrimariaSenha('#FF9800');
          }, 4000);
        });
    } else {
      alterarisvalidator(false);
      alterarCorPrimariaSenha('#F2453D');
      setTimeout(() => {
        alterarCorPrimariaSenha('#FF9800');
        alterarisvalidator(true);
      }, 4000);
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
    if (validar === false) {
      return (
        <Text style={estilos.infoErro}>
        Por favor, digite exatamente o texto EXCLUIR para confirmar a exclusão dos seus dados.
        </Text>
      );
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/)
      && nextAppState === 'active'
    ) {
      console.log('Come back of backgroud!');
    }
    refEntradaTexto.current.clear();
    appState.current = nextAppState;
    // console.log('AppState', appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    const backAction = () => {
      navigation.goBack();
      refEntradaTexto.current.clear();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      backHandler.remove();
    };
  }, []);

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
            refEntradaTexto.current.clear();
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
        ref={refEntradaTexto}
      />
      {(isvalidator === false) ? mostrarMensagemErro(false) : mostrarMensagemErro(true)}
      <Button
        testID="botao-excluir-perfil"
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
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 148,
    height: 48,
    marginRight: 16,
    marginTop: 16,
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
    height: 46,
    fontSize: 14,
  },
});
