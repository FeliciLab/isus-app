import React, { useEffect, useContext, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { CaixaDialogoContext } from '../../context/CaixaDialogoContext';
import FormContext from '../../context/FormContext';
import BtnLogin from './btnLogin';
import { efetuarAcesso } from '../../services/autenticacao';
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

  const efetuarLogin = (data) => {
    atribuirCarregando(true);

    emailNaoCadastrado(data.login)
      .then((invalido) => {
        if (invalido) {
          return exibirNovoCadastro();
        }

        return efetuarAcesso({ email: data.login, senha: data.senha })
          .then((result) => {
            if (!result.error) {
              return navigator.navigate(rotaAposLogin);
            }

            console.log('msg', result.msg);
            return false;
          })
          .catch(err => console.log('err', err));
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
