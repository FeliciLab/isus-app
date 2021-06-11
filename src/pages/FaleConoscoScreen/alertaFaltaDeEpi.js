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
import { postAlertaFaltaDeEpi } from '../../apis/apiHome';
import { TESTIDS } from '../../constantes/testIDs';
import { analyticsData } from '../../utils/analytics';
import { descricaoValida, unidadeDeSaudeValida } from '../../utils/validadores';
import { labelsAnalytics } from '../../constantes/labelsAnalytics';

export default function AlertaFaltaDeEpiScreen() {
  const descricaoInput = React.createRef();
  const unidadeDeSaudeInput = React.createRef();
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
      const { data } = await postAlertaFaltaDeEpi(descricao, unidadeDeSaude, email);
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

  return (
    <>
      <View style={{ flex: 1, padding: 15 }}>
        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 14,
            lineHeight: 20,
            color: '#828282',
            marginBottom: 18
          }}
        >
          Reporte a falta ou escassez dos equipamentos de EPI da
          sua Unidade de Saúde para nos ajudar a resolver o problema e melhorar a condição atual.
        </Text>

        <TextInput
          numberOfLines={5}
          mode="outlined"
          ref={descricaoInput}
          multiline
          value={descricao}
          label="Descreva a situação atual *"
          onChangeText={text => alterarDescricao(text)}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          mode="outlined"
          ref={unidadeDeSaudeInput}
          label="Unidade de Saúde *"
          value={unidadeDeSaude}
          onChangeText={text => alterarUnidadeDeSaude(text)}
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
            color: '#828282',
            marginBottom: 18
          }}
        >
          Campo Email não obrigatório
        </Text>
      </View>
      <View>
        <Button
          testID={TESTIDS.BOTAO_ALERTAEPI_ENVIAR}
          disabled={!!(!descricaoValida(descricao) || !unidadeDeSaudeValida(unidadeDeSaude))}
          style={descricaoValida(descricao) && unidadeDeSaudeValida(unidadeDeSaude)
            ? styles.button : styles.buttonDisabled}
          labelStyle={{ color: '#fff' }}
          mode="contained"
          loading={carregando}
          onPress={() => {
            analyticsData(labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI, 'Click', 'Fale Conosco');
            setCarregando(true);
            onSubmit();
          }}
        >
          Enviar
        </Button>

        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false)
          }}
        >
          Seu alerta foi enviado, obrigado!
        </Snackbar>
        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
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
    backgroundColor: '#FF9800'
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
