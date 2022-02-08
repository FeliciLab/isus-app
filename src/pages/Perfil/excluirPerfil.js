import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, DefaultTheme, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { deletarUsuario } from '~/apis/apiCadastro';
import { logout } from '~/apis/apiKeycloak';
import BarraDeStatus from '~/components/barraDeStatus';
import useAnalytics from '~/hooks/useAnalytics';
import { pegarTokenDoUsuarioNoStorage } from '~/services/autenticacao';

export default function ExcluirPerfil() {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const [palavra, setPalavra] = useState({});

  const [isvalidator, setIsvalidator] = useState(true);

  const [corPrimariaSenha, setCorPrimariaSenha] = useState('#FF9800');

  const refEntradaTexto = useRef(null);

  const appState = useRef(AppState.currentState);

  // TODO: provavelmente isso aqui deveria estar em um useState
  let estaConectado = true;

  // TODO: provavelmente isso deveria estar em um useRef
  const estaFocado = true;

  const realizarLogout = () => {
    try {
      const token = pegarTokenDoUsuarioNoStorage();
      logout(token);
    } catch (err) {
      console.log('erro', err);
    }
    // excluirTokenDoUsuarioNoStorage();
  };

  const excluirUsuario = () => {
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = NetInfo.addEventListener(state => {
      estaConectado = state.isConnected;
    });
    if (!estaConectado) {
      refEntradaTexto.current.clear();
      Alert.alert(
        'Sem conexão com a internet',
        'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('HOME');
            },
          },
        ],
      );
    }

    if (Object.keys(palavra).length !== 0 && palavra === 'EXCLUIR') {
      deletarUsuario()
        .then(value => {
          if (value.status === 200) {
            realizarLogout();
            navigation.navigate('CONTA_EXCLUIDA');
            analyticsData('confirmar_exclusao_conta', 'Click', 'Perfil');
          }
        })
        .catch(error => {
          console.log(error);
          setIsvalidator(false);
          setCorPrimariaSenha('#F2453D');
          setTimeout(() => {
            setIsvalidator(true);
            setCorPrimariaSenha('#FF9800');
          }, 4000);
        });
    } else {
      setIsvalidator(false);
      setCorPrimariaSenha('#F2453D');
      setTimeout(() => {
        setCorPrimariaSenha('#FF9800');
        setIsvalidator(true);
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
      placeholder: '#000000',
    },
  };

  const onChange = text => {
    setPalavra(text);
  };

  const mostrarMensagemErro = validar => {
    if (validar === false) {
      return (
        <Text style={styles.infoErro}>
          Por favor, digite exatamente o texto EXCLUIR para confirmar a exclusão
          dos seus dados.
        </Text>
      );
    }
  };

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('Come back of backgroud!');
    }
    refEntradaTexto.current.clear();
    appState.current = nextAppState;
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
      backAction,
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
        shadowOpacity: 0,
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Exclusão de Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            refEntradaTexto.current.clear();
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <BarraDeStatus backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.margem}>
        <Text style={styles.tituloDestaque}>
          Para confirmar a exclusão da sua conta no ID Saúde, digite EXCLUIR.
        </Text>
        <TextInput
          label="Confirmação de exclusão"
          autoFocus={estaFocado}
          onChangeText={text => onChange(text)}
          style={styles.campoDeTexto}
          mode="outlined"
          theme={theme}
          ref={refEntradaTexto}
        />
        {isvalidator === false
          ? mostrarMensagemErro(false)
          : mostrarMensagemErro(true)}
        <Button
          testID="botao-excluir-perfil"
          style={styles.botaoHabilitado}
          mode="contained"
          labelStyle={styles.botaoExcluirConta}
          onPress={() => {
            excluirUsuario();
          }}>
          EXCLUIR
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  margem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  tituloDestaque: {
    fontWeight: 'normal',
    fontSize: 20,
    paddingTop: 24,
    marginLeft: 16,
    marginRight: 16,
    color: 'rgba(0, 0, 0, 0.54)'
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
    fontWeight: '500',
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
