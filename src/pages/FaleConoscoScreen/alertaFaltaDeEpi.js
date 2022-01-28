import { useFocusEffect } from '@react-navigation/native';
import React, { createRef, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { postAlertaFaltaDeEpi } from '~/apis/apiHome';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import { descricaoValida, unidadeDeSaudeValida } from '~/utils/validadores';

export default function AlertaFaltaDeEpiScreen() {
  const { analyticsData } = useAnalytics();

  const descricaoInput = createRef();

  const unidadeDeSaudeInput = createRef();

  const emailInput = createRef();

  const [descricao, setDescricao] = useState('');

  const [unidadeDeSaude, setUnidadeDeSaude] = useState('');

  const [email, setEmail] = useState('');

  const [sucessoAoEnviar, setSucessoAoEnviar] = useState(false);

  const [erroAoEnviar, setErroAoEnviar] = useState(false);

  const [mensagemDeErro, setMensagemDeErro] = useState('');

  const [carregando, setCarregando] = useState(false);

  useFocusEffect(useCallback(() => () => limparCampos(), []));

  const onSubmit = async () => {
    try {
      const { data } = await postAlertaFaltaDeEpi(
        descricao,
        unidadeDeSaude,
        email,
      );
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
      if (err.message === 'Network Error')
        setMensagemDeErro(
          'Erro na conexão com o servidor. Tente novamente mais tarde.',
        );
      else
        setMensagemDeErro(
          'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        );
      setErroAoEnviar(true);
      setCarregando(false);
    }
  };

  const limparCampos = () => {
    setDescricao('');
    setUnidadeDeSaude('');
    setEmail('');
  };

  const extrairMensagemDeErro = response => {
    if (response.errors.descricao) return response.errors.descricao[0];
    if (response.errors.unidadeDeSaude)
      return response.errors.unidadeDeSaude[0];
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
            marginBottom: 18,
          }}>
          Reporte a falta ou escassez dos equipamentos de EPI da sua Unidade de
          Saúde para nos ajudar a resolver o problema e melhorar a condição
          atual.
        </Text>

        <TextInput
          numberOfLines={5}
          mode="outlined"
          ref={descricaoInput}
          multiline
          value={descricao}
          label="Descreva a situação atual *"
          onChangeText={text => setDescricao(text)}
          style={{ marginBottom: 20 }}
        />

        <TextInput
          mode="outlined"
          ref={unidadeDeSaudeInput}
          label="Unidade de Saúde *"
          value={unidadeDeSaude}
          onChangeText={text => setUnidadeDeSaude(text)}
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
            marginBottom: 18,
          }}>
          Campo Email não obrigatório
        </Text>
      </View>
      <View>
        <Button
          testID={TESTIDS.BOTAO_ALERTAEPI_ENVIAR}
          disabled={
            !!(
              !descricaoValida(descricao) ||
              !unidadeDeSaudeValida(unidadeDeSaude)
            )
          }
          style={
            descricaoValida(descricao) && unidadeDeSaudeValida(unidadeDeSaude)
              ? styles.button
              : styles.buttonDisabled
          }
          labelStyle={{ color: '#fff' }}
          mode="contained"
          loading={carregando}
          onPress={() => {
            analyticsData(
              labelsAnalytics.ENVIAR_ALERTA_FALTA_EPI,
              'Click',
              'Fale Conosco',
            );
            setCarregando(true);
            onSubmit();
          }}>
          Enviar
        </Button>

        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false),
          }}>
          Seu alerta foi enviado, obrigado!
        </Snackbar>
        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false),
          }}>
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
    backgroundColor: '#FF9800',
  },
  buttonDisabled: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
  },
});
