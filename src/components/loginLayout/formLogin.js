import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
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

  const [carregando, setCarregando] = useState(false);

  const [exibirErroSenha, setExibirErroSenha] = useState(false);

  const { register, trigger, errors, control } = useContext(FormContext);

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
    try {
      trigger();

      setCarregando(true);

      const invalido = await emailNaoCadastrado(data.email);

      if (invalido) {
        exibirNovoCadastro();
        return;
      }

      const result = await efetuarAcesso({
        email: data.email,
        senha: data.senha
      });

      setExibirErroSenha(false);

      if (result.error) {
        setExibirErroSenha(true);
        return;
      }

      const { token } = result;

      if (!token) {
        alterarEstaLogado(false);
        setCarregando(false);
        return;
      }

      alterarTokenUsuario(token);
      salvarTokenDoUsuarioNoStorage(token);

      const perfil = await perfilUsuario();

      alterarDadosUsuario(perfil.data);
      alterarPessoa(perfil.data);

      alterarEstaLogado(true);
      setCarregando(false);

      navigator.navigate(rotaAposLogin);
      return;
    } catch (err) {
      alterarEstaLogado(false);
      console.log('ERRO', err);
      if (err.response.status === 401) {
        setExibirErroSenha(true);
        return;
      }
    } finally {
      setCarregando(false);
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
      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
          validate: { emailValido: value => emailValido(value) }
        }}
        defaultValue=""
        render={({ onChange, value }) => (
          <TextInput
            ref={textInputEmail}
            mode="outlined"
            label="E-mail"
            style={style.campoTexto}
            placeholder="E-mail"
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={onChange}
            error={errors?.email}
            value={value}
          />
        )}
      />
      <MsgErroFormCampo campo="email" />

      <Controller
        control={control}
        name="senha"
        rules={{
          required: true
        }}
        defaultValue=""
        render={({ onChange, value }) => (
          <TextInput
            ref={textInputSenha}
            label="Senha"
            style={style.campoTexto}
            selectionColor="#0000AB"
            placeholder="Senha"
            mode="outlined"
            onChangeText={onChange}
            secureTextEntry
            value={value}
            error={errors?.senha}
          />
        )}
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
        disable={carregando}
      />
    </View>
  );
};

export default formLogin;
