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
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all', // all = Validation will trigger on the blur and change events
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(schema),
  });

  const { signIn } = useAutenticacao();

  const [carregando, setCarregando] = useState(false);

  const [alertText, setAlertText] = useState({
    headerText: '',
    bodyText: '',
  });

  const [visible, setVisible] = useState(false);

  const showAlertText = useCallback(text => {
    setAlertText(text);
    setVisible(true);
  }, []);

  const handleSubmitForm = async data => {
    const { email, senha } = data;

    analyticsData('fazer_login', 'Click', 'Perfil');

    try {
      setCarregando(true);

      const cadastrado = await signIn(email, senha);

      setValue('email', '');
      setValue('senha', '');

      navigation.navigate(
        cadastrado ? rotas.HOME_SCREEN_HOME : rotas.PRE_CADASTRO,
      );
    } catch (error) {
      if (error.response?.status === 401) {
        showAlertText({
          headerText: 'Credenciais incorretas!',
          bodyText: 'Tente novamente ou recupere sua senha.',
        });
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
      setValue('email', '');
      setValue('senha', '');
      setCarregando(false);
    };
  }, []);

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
          label="Email"
          name="email"
          mode="outlined"
          onChangeText={text => setValue('email', text.trim())}
          onSubmitEditing={() => {
            setFocus('senha');
          }}
          returnKeyType="next"
          placeholder="Email"
          selectionColor={CORES.CINZA_WEB}
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL}
          textContentType="emailAddress"
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
          onSubmitEditing={handleSubmit(handleSubmitForm)}
          returnKeyType="done"
          placeholder="Senha"
          secureTextEntry
          // selectionColor={CORES.AZUL}
          selectionColor={CORES.CINZA_WEB}
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA}
          textContentType="password"
          theme={textInputTheme}
        />
        <AlertaLogin
          bodyText={alertText.bodyText}
          duration={5000}
          headerText={alertText.headerText}
          onDismiss={() => setVisible(false)}
          visible={visible}
        />
        <View style={{ marginTop: 18 }}>
          <Botao
            disabled={
              errors?.email?.message || errors?.senha?.message || carregando
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
