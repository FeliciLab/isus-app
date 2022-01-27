import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DefaultTheme, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FormContext from '~/context/FormContext';
import { cadastrarUsuario } from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';

export default function FormularioSenha() {
  const navigator = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [botaoAtivo, alteraBotaoAtivo] = useState(false);

  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');

  const [cadastroRealizado, alterarCadastroRealizado] = useState(false);

  const mostrarAlerta = mensagem => {
    alterarMensagemDoAlerta(mensagem);
    alterarCadastroRealizado(true);
    setTimeout(() => alterarCadastroRealizado(false), 4000);
  };

  const { register, setValue, trigger, errors, getValues } = useContext(
    FormContext,
  );

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f',
    },
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  const tratarDadosCadastro = dadosCadastro => {
    const { cidade, cpf, telefone } = dadosCadastro;
    return {
      ...dadosCadastro,
      cidadeId: cidade.id,
      cidade: cidade.nome,
      cpf,
      telefone,
      termos: true,
    };
  };

  const realizarCadastroDoUsuario = async () => {
    const dados = tratarDadosCadastro(getValues());
    const resposta = await cadastrarUsuario(dados);
    return resposta.data;
  };

  const aposCadastro = resultado => {
    if (resultado.sucesso) {
      navigator.navigate('TelaDeSucesso', {
        textoApresentacao:
          'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.',
        telaDeRedirecionamento: 'LOGIN',
        telaDeBackground: '#304FFE',
      });
      return;
    }
    let mensagemErro;
    if (resultado.erros.cpf) {
      const [mensagemErroCPF] = resultado.erros.cpf;
      mensagemErro = mensagemErroCPF;
    }
    if (resultado.erros.email) {
      const [mensagemErroEmail] = resultado.erros.email;
      mensagemErro = mensagemErroEmail;
    }
    if (resultado.erros.email && resultado.erros.cpf) {
      const [mensagemErroEmail] = resultado.erros.email;
      const [mensagemErroCPF] = resultado.erros.cpf;
      mostrarAlerta(mensagemErroEmail);
      mostrarAlerta(mensagemErroCPF);
      return;
    }
    mostrarAlerta(mensagemErro);
  };

  useEffect(() => {
    register('senha', {
      required: true,
      minLength: {
        value: 8,
        message: 'A sua senha deve ter pelo menos 8 caracteres.',
      },
    });
    register('repetirsenha', {
      required: true,
      validate: repetirsenha =>
        repetirsenha === getValues('senha') || 'Não confere com a senha.',
    });
  }, [register]);

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={estilos.tituloDestaque}>Defina uma senha</Text>
        <View style={estilos.containerCampoDeTexto}>
          <TextInput
            label="Senha"
            name="senha"
            secureTextEntry
            underlineColor="#BDBDBD"
            onChangeText={text => alteraValor('senha', text)}
            style={estilos.campoDeTexto}
            mode="outlined"
            theme={theme}
          />
          {errors.senha && (
            <Text style={{ color: '#000000' }}> {errors.senha.message} </Text>
          )}
        </View>
        <View>
          <TextInput
            label="Confirmação de senha"
            name="repetirsenha"
            secureTextEntry
            underlineColor="#BDBDBD"
            onChangeText={text => alteraValor('repetirsenha', text)}
            style={estilos.campoDeTexto}
            mode="outlined"
            theme={theme}
          />
          {errors.repetirsenha && (
            <Text style={{ color: '#000000' }}>
              {' '}
              {errors.repetirsenha.message}{' '}
            </Text>
          )}
        </View>
      </View>
      <Button
        disabled={!botaoAtivo}
        style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        loading={isLoading}
        onPress={async () => {
          setIsLoading(true);
          try {
            const resultado = await realizarCadastroDoUsuario();
            aposCadastro(resultado);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
            setIsLoading(false);
          }
        }}>
        Finalizar
      </Button>
      <Alerta visivel={cadastroRealizado} textoDoAlerta={mensagemDoAlerta} />
    </>
  );
}

const estilos = StyleSheet.create({
  tituloDestaque: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerCampoDeTexto: {
    paddingBottom: 15,
  },
  campoDeTexto: {
    backgroundColor: '#FFF',
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD',
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE',
  },
});
