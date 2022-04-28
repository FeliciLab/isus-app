import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Config } from 'react-native-config';
import { DefaultTheme } from 'react-native-paper';
import Alerta from '~/components/alerta';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { TESTIDS } from '~/constantes/testIDs';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import useCaixaDialogo from '~/hooks/useCaixaDialogo';
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
  },
};

const FormularioLogin = ({ route }) => {
  const navigation = useNavigation();

  const { analyticsData } = useAnalytics();

  const caixaDialogo = useCaixaDialogo();

  const { control, handleSubmit, getValues, setValue, errors } = useForm({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(schema),
  });

  const { signIn } = useAutenticacao();

  const [carregando, setCarregando] = useState(false);

  const [textoDoAlerta, setTextoDoAlerta] = useState('');

  const [visivel, setVisivel] = useState(false);

  const mostrarAlerta = useCallback(texto => {
    setTextoDoAlerta(texto);
    setVisivel(true);
  }, []);

  const handleSubmitForm = async (data, options) => {
    const { email, senha } = data;

    const tentativa = options?.tentativa || 1;

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
        mostrarAlerta('Email e/ou senha incorreto(s)');
        return;
      } else if (error.message) {
        if (!error.message.semConexao) {
          mostrarAlerta(error.mensagem);
          return;
        }

        if (tentativa > 3) {
          navigation.navigate(rotas.SEM_CONEXAO, { formlogin: true });
        } else {
          caixaDialogo.SemConexao(
            {
              acaoConcluir: tentarLoginNovamente,
            },
            tentativa,
          );
        }
      }
    } finally {
      setCarregando(false);
    }
  };

  const tentarLoginNovamente = tentativa =>
    handleSubmitForm(getValues(), { tentativa: tentativa + 1 });

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
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL}
          control={control}
          name="email"
          mode="outlined"
          placeholder="Email"
          label="Email"
          theme={textInputTheme}
        />
        <ControlledTextInput
          style={{ marginTop: 8 }}
          testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA}
          control={control}
          name="senha"
          mode="outlined"
          placeholder="Senha"
          label="Senha"
          secureTextEntry
          theme={textInputTheme}
        />
        <View style={{ marginTop: 18 }}>
          <Botao
            disabled={errors?.email || errors?.senha || carregando}
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
      <Alerta
        textoDoAlerta={textoDoAlerta}
        visivel={visivel}
        duration={5000}
        onDismiss={() => setVisivel(false)}
      />
    </IDSaudeLoginTemplate>
  );
};

export default FormularioLogin;
