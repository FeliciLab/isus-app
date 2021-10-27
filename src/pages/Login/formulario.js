import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { Controller } from 'react-hook-form';
import {
  // Alert,
  Text,
  View
} from 'react-native';
import { Config } from 'react-native-config';
import { DefaultTheme, TextInput } from 'react-native-paper';
import { perfilUsuario } from '../../apis/apiCadastro';
import Alerta from '../../components/alerta';
import rotas from '../../constantes/rotas';
import { TESTIDS } from '../../constantes/testIDs';
import FormContext from '../../context/FormContext';
import useAnalytics from '../../hooks/Analytics';
import useCaixaDialogo from '../../hooks/CaixaDialogo/CaixaDialogoSemConexao';
import useDialogAppTrack from '../../hooks/DialogAppTrack';
import useAutenticacao from '../../hooks/useAutenticacao';
import {
  armazenarEstadoLogado,
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage
} from '../../services/autenticacao';
import { emailValido, senhaValido } from '../../utils/validadores';
import IDSaudeLoginTemplate from './idsaudeLoginTemplate';
import { Botao } from './styles';

const FormularioLogin = ({ route }) => {
  const navigation = useNavigation();

  const { exibirDialog } = useDialogAppTrack();

  const { analyticsData } = useAnalytics();

  const refSubmit = useRef();

  const caixaDialogo = useCaixaDialogo();

  const {
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    trigger
  } = useContext(FormContext);

  const {
    alterarTokenUsuario,
    alterarDadosUsuario,
    alterarEstaLogado,
    alterarPessoa
  } = useAutenticacao();

  const [carregando, setCarregando] = useState(false);
  const [textoDoAlerta, setTextoDoAlerta] = useState('');
  const [visivel, setVisivel] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#fff',
      accent: '#fff',
      text: '#fff',
      background: '#304FFE',
      placeholder: '#fff'
    }
  };

  const mostrarAlerta = useCallback(async texto => {
    setTextoDoAlerta(texto);
    setVisivel(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setVisivel(false);
        resolve();
      }, 5000);
    });
  }, []);

  const submitForm = async (data, options) => {
    if (exibirDialog('o Login')) {
      return;
    }

    const tentativa = options?.tentativa || 1;

    analyticsData('fazer_login', 'Click', 'Perfil');
    setCarregando(true);
    trigger();

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await fazerLogin(data);
    } catch (erro) {
      const err = JSON.parse(erro.message);
      if (!err.semConexao) {
        mostrarAlerta(err.mensagem);
        return;
      }
      if (tentativa > 3) {
        navigation.navigate(rotas.SEM_CONEXAO, { formlogin: true });
      }
      if (tentativa <= 3) {
        caixaDialogo.SemConexao(
          {
            acaoConcluir: tentarLoginNovamente
          },
          tentativa
        );
      }
    }
  };

  const tentarLoginNovamente = tentativa =>
    submitForm(getValues(), { tentativa: tentativa + 1 });

  const fazerLogin = async ({ email, senha }) => {
    let response;
    try {
      response = await autenticarComIdSaude(email, senha);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Alert.alert('Título', 'Email e/ou senha incorreto(s)', [
          //   {
          //     text: 'Cancel',
          //     style: 'default'
          //   },
          // ]);
          mostrarAlerta('Email e/ou senha incorreto(s)');
        }
      }
      return;
    } finally {
      setCarregando(false);
    }

    await salvarTokenDoUsuarioNoStorage(response.mensagem);
    alterarTokenUsuario(response.mensagem);

    try {
      const perfil = await perfilUsuario(response.mensagem);
      alterarDadosUsuario(perfil.data);
      alterarPessoa(perfil.data);
      if (!perfil.cadastrado) {
        navigation.navigate(rotas.PRE_CADASTRO_INTRODUCAO);
        return;
      }

      await armazenarEstadoLogado(true);
      alterarEstaLogado(true);

      setValue('email', '');
      setValue('senha', '');

      navigation.navigate('HOME');
    } catch (e) {
      await armazenarEstadoLogado(false);
      alterarEstaLogado(false);
    }
  };

  const abrirWebViewEsqueciMinhaSenha = () => {
    analyticsData('esqueci_minha_senha', 'Click', 'Perfil');
    navigation.navigate('webview', {
      title: 'Esqueci minha senha',
      url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
      idSaude: true
    });
  };

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
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            validate: { emailValido: value => emailValido(value) }
          }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_EMAIL}
              label="E-mail"
              mode="outlined"
              placeholder="E-mail"
              selectionColor="#0000AB"
              onChangeText={v => onChange(v)}
              onBlur={e => {
                onBlur(e);
                trigger('email');
              }}
              autoCapitalize="none"
              value={value}
              theme={theme}
            />
          )}
        />
        {errors?.email && (
          <Text style={{ color: '#ffffff' }}> Insira um e-mail válido. </Text>
        )}
        <Controller
          control={control}
          name="senha"
          rules={{
            required: true,
            validate: { senhaValida: value => senhaValido(value) }
          }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              testID={TESTIDS.FORMULARIO.LOGIN.CAMPO_SENHA}
              style={{ marginTop: 18 }}
              onChangeText={txt => onChange(txt)}
              onBlur={e => {
                onBlur(e);
                trigger('senha');
              }}
              value={value}
              theme={theme}
              label="Senha"
              selectionColor="#0000AB"
              placeholder="Senha"
              mode="outlined"
              secureTextEntry
            />
          )}
        />

        {errors?.senha && (
          <Text style={{ color: '#ffffff' }}>
            O campo de senha deve ser preenchido.
          </Text>
        )}

        <View style={{ marginTop: 18 }}>
          <Botao
            ref={refSubmit}
            disabled={errors?.email || errors?.senha || carregando}
            testID={TESTIDS.BUTTON_FAZER_LOGIN}
            mode="contained"
            loading={carregando}
            onPress={handleSubmit(submitForm)}
          >
            Fazer Login
          </Botao>
          <Botao
            testID={TESTIDS.BUTTON_ESQUECI_SENHA}
            onPress={() => {
              abrirWebViewEsqueciMinhaSenha();
            }}
            mode="text"
            color="#ffffff"
          >
            Esqueci minha senha
          </Botao>
        </View>
      </View>
      <Alerta textoDoAlerta={textoDoAlerta} visivel={visivel} />
    </IDSaudeLoginTemplate>
  );
};

export default FormularioLogin;
