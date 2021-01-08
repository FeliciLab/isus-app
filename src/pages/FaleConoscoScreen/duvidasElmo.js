import React, { useState, useCallback } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput, Button, Snackbar
} from 'react-native-paper';
import { postDemandaEducacao } from '../../apis/apiHome';
import { CORES } from '../../constantes/estiloBase';

export default function DuvidasElmoScreen() {
  const descricaoInput = React.createRef();
  const emailInput = React.createRef();
  const [descricao, alterarDescricao] = useState('');
  const [unidadeDeSaude, alterarUnidadeDeSaude] = useState('');
  const [email, setEmail] = React.useState('');
  const [sucessoAoEnviar, setSucessoAoEnviar] = React.useState(false);
  const [erroAoEnviar, setErroAoEnviar] = React.useState(false);
  const [mensagemDeErro, setMensagemDeErro] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => () => limparCampos(), [])
  );

  const onSubmit = async () => {
    try {
      const { data } = await postDemandaEducacao(descricao, unidadeDeSaude, email);
      if (data.errors) {
        setMensagemDeErro(extrairMensagemDeErro(data));
        setErroAoEnviar(true);
        setCarregando(false);
      } else {
        limparCampos();
        setCarregando(false);
        setSucessoAoEnviar(true);
      }
    } catch (err) {
      if (err.message === 'Network Error') setMensagemDeErro('Erro na conexão com o servidor. Tente novamente mais tarde.');
      else setMensagemDeErro('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      setErroAoEnviar(true);
      setCarregando(false);
    }
  };

  const limparCampos = () => {
    alterarDescricao('');
    alterarUnidadeDeSaude('');
    setEmail('');
  };

  const extrairMensagemDeErro = (response) => {
    if (response.errors.descricao) return response.errors.descricao[0];
    if (response.errors.unidadeDeSaude) return response.errors.unidadeDeSaude[0];
    return '';
  };

  const descricaoValida = () => descricao.replace(/\s/g, '').length;
  const unidadeDeSaudeValida = () => unidadeDeSaude.replace(/\s/g, '').length;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.INDIGO_DYE,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Dúvidas Sobre Elmo',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
        <View style={{ flex: 1, padding: 15 }}>
          <TextInput
            numberOfLines={5}
            mode="outlined"
            ref={descricaoInput}
            multiline
            value={descricao}
            label="Dúvidas sobre o Elmo *"
            onChangeText={text => alterarDescricao(text)}
            style={{ marginBottom: 20 }}
          />

          <TextInput
            mode="outlined"
            ref={emailInput}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ marginBottom: 20 }}
          />

          <Text
            style={{
              letterSpacing: 0.25,
              fontSize: 14,
              lineHeight: 20,
              color: CORES.CINZA_WEB,
              marginBottom: 18
            }}
          >
            Campo Email não obrigatório
          </Text>
        </View>
        <View>
        <Button
          disabled={!!(!descricaoValida() || !unidadeDeSaudeValida())}
          style={descricaoValida() && unidadeDeSaudeValida()
            ? styles.button : styles.buttonDisabled}
          labelStyle={{ color: CORES.BRANCO }}
          mode="contained"
          loading={carregando}
          onPress={() => {
            setCarregando(true);
            onSubmit();
          }}
        >
          Enviar
        </Button>

        <Snackbar
          style={{ backgroundColor: CORES.PRETO30 }}
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false)
          }}
        >
          Sua demanda foi enviado, obrigado!
        </Snackbar>
        <Snackbar
          style={{ backgroundColor: CORES.PRETO30 }}
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false)
          }}
        >
          {mensagemDeErro}
        </Snackbar>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: CORES.LARANJA
  },
  buttonDisabled: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center'
  }
});
