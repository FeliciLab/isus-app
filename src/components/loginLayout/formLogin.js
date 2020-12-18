import React, {
  useEffect, useContext, useState, useRef
} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { CaixaDialogoContext } from '../../context/CaixaDialogoContext';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import FormContext from '../../context/FormContext';
import BtnLogin from './btnLogin';
import { efetuarAcesso, pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import { perfilUsuario } from '../../apis/apiCadastro';
import { emailNaoCadastrado } from '../../utils/validadores';
import { CORES } from '../../constantes/estiloBase';
import Regex from '../../utils/regex';
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
  const {
    register,
    setValue,
    trigger,
    errors
  } = useContext(FormContext);
  const {
    mostrarCaixaDialogo,
    fecharCaixaDialogo
  } = useContext(CaixaDialogoContext);
  const {
    alterarDadosUsuario,
    alterarTokenUsuario,
    alterarEstaLogado
  } = useContext(AutenticacaoContext);

  useEffect(() => {
    register('email', {
      validate: email => emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com'
    });

    register('senha', {
      required: 'O campo senha é obrigatório'
    });
  }, [register]);

  const exibirNovoCadastro = () => {
    mostrarCaixaDialogo({
      titulo: 'E-mail não cadastrado',
      texto: 'E-mail informado não está no ID Saúde. Verifique seus dados ou cadastre-se para acessar nossos conteúdos personalizados.',
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

  const efetuarLogin = (data) => {
    setTimeout(async () => {
      textInputEmail.current.clear();
      textInputSenha.current.clear();
    }, 8000);
    trigger();

    if (Object.keys(errors).length > 0) {
      return;
    }

    atribuirCarregando(true);

    emailNaoCadastrado(data.email)
      .then((invalido) => {
        if (invalido) {
          return exibirNovoCadastro();
        }

        return efetuarAcesso({ email: data.email, senha: data.senha })
          .then(async (result) => {
            if (result.error) {
              atribuirExibirErroSenha(true);
              return false;
            }
            atribuirExibirErroSenha(false);

            const token = await pegarTokenDoUsuarioNoStorage();
            if (!token) {
              alterarTokenUsuario({});
              alterarEstaLogado(false);
            }

            alterarTokenUsuario(token);
            try {
              const perfil = await perfilUsuario();
              alterarDadosUsuario(perfil.data);
              alterarEstaLogado(true);
            } catch (err) {
              alterarEstaLogado(false);
              console.log('ERRO', err);
            }

            return navigator.navigate(rotaAposLogin);
          })
          .catch((err) => {
            atribuirExibirErroSenha(true);
            console.log('err', err);
          });
      })
      .finally(() => atribuirCarregando(false));
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
          Senha, incorreta. Tente novamente ou clique em
          &ldquo;Esqueci a senha&rdquo; para redefini-la.
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
