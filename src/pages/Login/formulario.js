import React, {
  useState, useContext, useRef
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Config } from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme, TextInput } from 'react-native-paper';

import Alerta from '../../components/alerta';
import {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  armazenarEstadoLogado
} from '../../services/autenticacao';
import { Botao } from './styles';
import { TESTIDS } from '../../constantes/testIDs';
import { analyticsData } from '../../utils/analytics';
import { emailValido, senhaValido } from '../../utils/validadores';
import IDSaudeLoginTemplate from './idsaudeLoginTemplate';
import { perfilUsuario } from '../../apis/apiCadastro';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import rotas from '../../constantes/rotas';
import useCaixaDialogo from '../../hooks/CaixaDialogo/CaixaDialogoSemConexao';

const FormularioLogin = ({ route }) => {
  const refSenha = useRef();
  const refSubmit = useRef();
  const caixaDialogo = useCaixaDialogo();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    trigger,
  } = useForm();

  const {
    alterarTokenUsuario,
    alterarDadosUsuario,
    alterarEstaLogado
  } = useContext(AutenticacaoContext);

  const [carregando, alterarCarregando] = useState(false);
  const [textoDoAlerta, alterarTextoDoAlerta] = useState('');
  const [visivel, alterarVisibilidade] = useState(false);

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

  const mostrarAlerta = async (texto) => {
    alterarTextoDoAlerta(texto);
    alterarVisibilidade(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        alterarVisibilidade(false);
        resolve();
      }, 2000);
    });
  };

  const submitForm = async (data, options) => {
    const tentativa = options?.tentativa || 1;
    analyticsData('fazer_login', 'Click', 'Perfil');
    alterarCarregando(true);
    trigger();
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const result = await fazerLogin(data);
      console.log('Result:', result);
    } catch (err) {
      mostrarAlerta(err?.message);
      // mostrarAlerta(err.response.data.erros);
      if (tentativa <= 3) {
        caixaDialogo.SemConexao(
          {
            acaoConcluir: tentarLoginNovamente
          }, tentativa
        );
      }
    } finally {
      console.log('finally');
    }
  };

  const tentarLoginNovamente = (tentativa) => {
    console.log('tentativa:', tentativa);
    if (tentativa >= 3) {
      navigation.navigate(rotas.SEM_CONEXAO, { formlogin: true });
    }
    console.log('email:', getValues('email'));
    console.log('senha:', getValues('senha'));
    return submitForm(getValues(), { tentativa: tentativa + 1 });
  };

  const fazerLogin = async ({ email, senha }) => autenticarComIdSaude(email, senha)
    .then(async (response) => {
      console.log('response', response);
      try {
        await salvarTokenDoUsuarioNoStorage(response.mensagem);
      } catch (e) {
        console.log('problema em salvar o token', e);
      }

      try {
        await pegarTokenDoUsuarioNoStorage();
      } catch (e) {
        console.log('problema em pegar o token', e);
      }

      alterarTokenUsuario(response.mensagem);

      try {
        const perfil = await perfilUsuario();
        alterarDadosUsuario(perfil.data);
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

      // mostrarAlerta(err.response.data.erros);
    })
    .catch((err) => {
      // TODO: Diferenciar a exceção de email ou senha inválido da exceção de
      //      sem conexão. Ambos os casos estão caindo aqui!
      throw new Error(err);
      // mostrarAlerta(err.response.data.erros);
    })
    .finally(() => {
      alterarCarregando(false);
    });


  const abrirWebViewEsqueciMinhaSenha = () => {
    analyticsData('esqueci_minha_senha', 'Click', 'Perfil');
    navigation.navigate('webview', {
      title: 'Esqueci minha senha',
      url: `${Config.IDSAUDE_URL}/auth/realms/saude/login-actions/reset-credentials?client_id=account`,
      idSaude: true
    });
  };

  return (
    <IDSaudeLoginTemplate route={route}>
      <>
        <View style={{ marginHorizontal: 16 }}>
          <Controller
            control={control}
            name="email"
            rules={{ required: true, validate: { emailValido: value => emailValido(value) } }}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <TextInput
                autoFocus
                label="E-mail"
                mode="outlined"
                placeholder="E-mail"
                selectionColor="#0000AB"
                onChangeText={v => onChange(v)}
                onBlur={(e) => {
                  onBlur(e);
                  trigger('email');
                  refSenha.current.focus();
                }}
                value={value}
                theme={theme}
              />
            )}
          />
          {errors.email && (
            <Text style={{ color: '#ffffff' }}> Insira um e-mail válido. </Text>
          )}
          <Controller
            control={control}
            name="senha"
            rules={{ required: true, validate: { senhaValida: value => senhaValido(value) } }}
            defaultValue=""
            render={({ onChange, onBlur, value }) => (
              <TextInput
                ref={refSenha}
                style={{ marginTop: 18 }}
                onChangeText={txt => onChange(txt)}
                onBlur={(e) => {
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

          {errors.senha && (
            <Text style={{ color: '#ffffff' }}> O campo de senha deve ser preenchido. </Text>
          )}

          <View style={{ marginTop: 18 }}>
            <Botao
              ref={refSubmit}
              disabled={errors.email || errors.senha}
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
        <Alerta
          textoDoAlerta={textoDoAlerta}
          visivel={visivel}
        />
      </>
    </IDSaudeLoginTemplate>
  );
};

export default FormularioLogin;
