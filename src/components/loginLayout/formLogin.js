import React, { useEffect, useContext, useState } from 'react';
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
import { cores } from '../../constantes/estiloBase';

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


const formLogin = ({ rotaAposLogin }) => {
  const [carregando, atribuirCarregando] = useState(false);
  const navigator = useNavigation();
  const { register, setValue } = useContext(FormContext);
  const { mostrarCaixaDialogo, fecharCaixaDialogo } = useContext(CaixaDialogoContext);
  const {
    alterarDadosUsuario,
    alterarTokenUsuario,
    alterarEstaLogado
  } = useContext(AutenticacaoContext);

  useEffect(() => {
    register('login');
    register('senha');
  }, [register]);

  const exibirNovoCadastro = () => {
    mostrarCaixaDialogo({
      titulo: 'E-mail não cadastrado',
      texto: 'E-mail informado não está no ID Saúde. Verifique seus dados ou cadastre-se para acessar nossos conteúdos personalizados.',
      cor: cores.laranja,
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

  const exibirCredenciaisInvalidas = () => {
    mostrarCaixaDialogo({
      titulo: 'Credenciais inválidas',
      texto: 'As credenciais de acesso estão inválidas. Verifique seus dados ou clique em esqueci minha senha para acessar nossos conteúdos personalizados.',
      cor: cores.laranja,
      textoConclusao: '',
      textoCancelamento: 'VOLTAR',
      aoConcluir: () => {
        fecharCaixaDialogo();
      },
      aoCancelar: () => {
        fecharCaixaDialogo();
      }
    });
  }

  const efetuarLogin = (data) => {
    atribuirCarregando(true);

    emailNaoCadastrado(data.login)
      .then((invalido) => {
        if (invalido) {
          return exibirNovoCadastro();
        }

        return efetuarAcesso({ email: data.login, senha: data.senha })
          .then(async (result) => {
            if (result.error) {
              exibirCredenciaisInvalidas();
              return false;
            }

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
            exibirCredenciaisInvalidas();
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
        style={style.campoTexto}
        mode="outlined"
        label="E-mail"
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={text => setValue('login', text)}
      />
      <TextInput
        style={style.campoTexto}
        label="Senha"
        mode="outlined"
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={text => setValue('senha', text)}
      />
      <BtnLogin
        style={{ marginTop: 40 }}
        acao={efetuarLogin}
        carregando={carregando}
      />
    </View>
  );
};

export default formLogin;
