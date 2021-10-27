import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { perfilUsuario } from '../../apis/apiCadastro';
import { CORES } from '../../constantes/estiloBase';
import { CaixaDialogoContext } from '../../context/CaixaDialogoContext';
import FormContext from '../../context/FormContext';
import useAutenticacao from '../../hooks/useAutenticacao';
import {
  efetuarAcesso,
  salvarTokenDoUsuarioNoStorage
} from '../../services/autenticacao';
import Regex from '../../utils/regex';
import { emailNaoCadastrado } from '../../utils/validadores';
import BtnLogin from './btnLogin';
import MsgErroFormCampo from './msgErroFormCampo';

const style = StyleSheet.create({
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40
  },
  campoTexto: {
    marginTop: 5,
    marginBottom: 5
  }
});

const emailValido = email => email && Regex.EMAIL.test(email.toLowerCase());

const formLogin = ({ rotaAposLogin }) => {
  const navigator = useNavigation();

  const textInputEmail = useRef(null);

  const textInputSenha = useRef(null);

  const [carregando, atribuirCarregando] = useState(false);

  const [exibirErroSenha, atribuirExibirErroSenha] = useState(false);

  const { register, setValue, trigger, errors } = useContext(FormContext);

  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(
    CaixaDialogoContext
  );

  const {
    alterarDadosUsuario,
    alterarTokenUsuario,
    alterarEstaLogado,
    alterarPessoa
  } = useAutenticacao();

  useEffect(() => {
    register('email', {
      validate: email =>
        emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com'
    });

    register('senha', {
      required: 'O campo senha é obrigatório'
    });
  }, [register]);

  const exibirNovoCadastro = () => {
    mostrarCaixaDialogo({
      titulo: 'E-mail não cadastrado',
      texto:
        'E-mail informado não está no ID Saúde. Verifique seus dados ou cadastre-se para acessar nossos conteúdos personalizados.',
      cor: CORES.LARANJA,
      textoConclusao: 'CRIAR CONTA',
      textoCancelamento: 'VOLTAR',
      aoConcluir: () => {
        fecharCaixaDialogo();
        navigator.navigate('CADASTRO');
      },
      aoCancelar: () => {
        fecharCaixaDialogo();
      }
    });
  };

  const efetuarLogin = async data => {
    trigger();
    if (Object.keys(errors).length > 0) {
      return;
    }

    atribuirCarregando(true);
    const invalido = await emailNaoCadastrado(data.email);
    if (invalido) {
      exibirNovoCadastro();
      return;
    }

    const result = await efetuarAcesso({
      email: data.email,
      senha: data.senha
    });
    atribuirExibirErroSenha(false);
    if (result.error) {
      atribuirExibirErroSenha(true);
      return;
    }

    try {
      const { token } = result;
      if (!token) {
        alterarEstaLogado(false);
        atribuirCarregando(false);
        return;
      }
      alterarTokenUsuario(token);
      salvarTokenDoUsuarioNoStorage(token);

      const perfil = await perfilUsuario();

      alterarDadosUsuario(perfil.data);
      alterarPessoa(perfil.data);

      alterarEstaLogado(true);
      atribuirCarregando(false);

      navigator.navigate(rotaAposLogin);
      return;
    } catch (err) {
      alterarEstaLogado(false);
      console.log('ERRO', err);
    } finally {
      atribuirCarregando(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        justifyContent: 'center'
      }}
    >
      <Text style={style.titulo}>Conecte-se com seu ID Saúde</Text>
      <TextInput
        ref={textInputEmail}
        style={style.campoTexto}
        mode="outlined"
        label="E-mail"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => setValue('email', text)}
      />
      <MsgErroFormCampo campo="email" />
      <TextInput
        ref={textInputSenha}
        style={style.campoTexto}
        label="Senha"
        mode="outlined"
        textContentType="password"
        secureTextEntry
        onChangeText={text => setValue('senha', text)}
      />
      <MsgErroFormCampo campo="senha" />
      {exibirErroSenha && !carregando && (
        <Text style={{ color: CORES.LARANJA }}>
          Senha, incorreta. Tente novamente ou clique em &ldquo;Esqueci a
          senha&rdquo; para redefini-la.
        </Text>
      )}
      <BtnLogin
        style={{ marginTop: 40 }}
        acao={efetuarLogin}
        carregando={carregando}
      />
    </View>
  );
};

export default formLogin;
