import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Config } from 'react-native-config';
import { DefaultTheme } from 'react-native-paper';
import AlertaLogin from '~/components/AlertaLogin';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import IDSaudeLoginTemplate from '../IDSaudeLoginTemplate';
import schema from './schema';
import { Botao } from './styles';

const textInputTheme = {
  ...DefaultTheme,
  colors: {
    primary: CORES.BRANCO,
    accent: CORES.BRANCO,
    text: CORES.BRANCO,
    background: CORES.AZUL,
    placeholder: CORES.BRANCO,
    error: CORES.VERMELHO,
  },
};

const FormularioLogin = ({ route }) => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const {
    control,
    clearErrors,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isCpf: false,
      username: '',
      senha: '',
    },
    resolver: yupResolver(schema),
  });

  const { signIn } = useAutenticacao();

  const [carregando, setCarregando] = useState(false);

  const [alertText, setAlertText] = useState({
    headerText: 'Credenciais incorretas!',
    bodyText: 'Tente novamente ou recupere sua senha.',
  });

  const [alertVisible, setAlertVisible] = useState(false);

  const showAlertText = useCallback((visible = true, text) => {
    text && setAlertText(text);
    setAlertVisible(visible);
    visible === false && clearErrors(['username', 'senha']);
  }, []);

  const handleSubmitForm = async data => {
    const { username, senha, isCpf } = data;

    analyticsData('fazer_login', 'Click', 'Perfil');

    showAlertText(false);

    try {
      setCarregando(true);

      const cadastrado = await signIn(
        isCpf === true
          ? username.replace(/[^\d]+/g, '').trim()
          : username.trim(),
        senha
      );

      setValue('username', '');
      setValue('senha', '');

      navigation.navigate(
        cadastrado ? rotas.HOME_SCREEN_HOME : rotas.PRE_CADASTRO,
      );
    } catch (error) {
      if (error.response?.status === 401) {
        showAlertText(true, {
          headerText: 'Credenciais incorretas!',
          bodyText: 'Tente novamente ou recupere sua senha.',
        });

        // Marca o input com cor de erro, sem enviar mensagem
        // O type é opcional para organizar o debug do obj de erro
        setError('username', { type: 'manual' });
        setError('senha', { type: 'manual' });

        return;
      }
    } finally {
      setCarregando(false);
    }
  };

  const abrirWebViewEsqueciMinhaSenha = useCallback(() => {
    analyticsData('esqueci_minha_senha', 'Click', 'Perfil');
    navigation.navigate('webview', {
      title: 'Esqueci minha senha',
      url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
      idSaude: true,
    });
  }, []);

  useEffect(() => {
    return () => {
      setValue('username', '');
      setValue('senha', '');
      setCarregando(false);
      setAlertVisible(false);
    };
  }, []);

  const consideraCpfRegex = /^(\d{3})[.]?(\d{3})[.]?/;
  const consideraEmailRegex = /@/;
  const cpfRegex = /^(\d{3})[.]?(\d{3})[.]?(\d{3})[-.]?(\d{2})/;

  const handleOnChangeText = (text) => {
    if (!consideraEmailRegex.test(text) && consideraCpfRegex.test(text)) {
      // Avisa ao validador do Yup que é um CPF
      setValue('isCpf', true);

      const maskedValue = text.replace(cpfRegex, '$1.$2.$3-$4');

      setValue('username', maskedValue.trim());
    } else {
      setValue('isCpf', false);

      setValue('username', text.trim());
    }
  };

  return (
    <IDSaudeLoginTemplate route={route}>
      <View style={{ marginHorizontal: 16 }}>
        <ControlledTextInput
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={false} // não deixa teclado sumir no enter
          control={control}
          errorTextStyle={{ color: CORES.BRANCO, fontSize: 14 }}
          keyboardType="email-address"
          label="Email ou CPF"
          name="username"
          mode="outlined"
          onChange={() => showAlertText(false)}
          onChangeText={handleOnChangeText}
          onSubmitEditing={() => {
            setFocus('senha');
          }}
          returnKeyType="next"
          placeholder="Email ou CPF"
          selectionColor={CORES.CINZA_WEB}
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_USERNAME}
          textContentType="username"
          theme={textInputTheme}
        />
        <ControlledTextInput
          autoCapitalize="none"
          control={control}
          style={{ marginTop: 18 }}
          errorTextStyle={{ color: CORES.BRANCO, fontSize: 14 }}
          label="Senha"
          name="senha"
          mode="outlined"
          onChange={() => showAlertText(false)}
          onSubmitEditing={handleSubmit(handleSubmitForm)}
          returnKeyType="done"
          placeholder="Senha"
          secureTextEntry
          selectionColor={CORES.CINZA_WEB}
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA}
          textContentType="password"
          theme={textInputTheme}
        />
        <AlertaLogin
          bodyText={alertText.bodyText}
          headerText={alertText.headerText}
          visible={alertVisible}
        />
        <View style={{ marginTop: 18 }}>
          <Botao
            disabled={
              errors?.username?.message || errors?.senha?.message || carregando
            }
            testID={TESTIDS.BUTTON_FAZER_LOGIN}
            mode="contained"
            loading={carregando}
            onPress={handleSubmit(handleSubmitForm)}>
            Fazer Login
          </Botao>
          <Botao
            testID={TESTIDS.BUTTON_ESQUECI_SENHA}
            onPress={() => {
              abrirWebViewEsqueciMinhaSenha();
            }}
            mode="text"
            color={CORES.BRANCO}>
            Esqueci minha senha
          </Botao>
        </View>
      </View>
    </IDSaudeLoginTemplate>
  );
};

export default FormularioLogin;
