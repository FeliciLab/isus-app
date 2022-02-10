import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { cadastrarUsuario } from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import FormContext from '~/context/FormContext';
import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import {
  analyticsCategoria,
  analyticsUnidadeServico,
} from '~/utils/funcoesAnalytics';
import {
  Botao,
  CampoDeTexto,
  Scroll,
  TextoDeErro,
  Titulo,
  TituloDoFormulario,
} from './styles';
import textos from './textos.json';

export default function FormularioSenha({ navigation }) {
  const { analyticsData } = useAnalytics();

  const [carregando, setCarregando] = React.useState(false);

  const [botaoAtivo, setBotaoAtivo] = React.useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = React.useState('');

  const [cadastroRealizado, setCadastroRealizado] = React.useState(false);

  const { signIn } = useAutenticacao();

  const { register, setValue, trigger, errors, getValues } = useContext(
    FormContext,
  );

  const valores = getValues();

  const { categoriaProfissional } = valores;

  const uniServ = JSON.parse(valores.unidadeServico);

  const now = Date.now();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={28} color="#304FFE" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const mostrarAlerta = mensagem => {
    setMensagemDoAlerta(mensagem);
    setCadastroRealizado(true);
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE',
    },
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger(['senha', 'repetirsenha']);
    setBotaoAtivo(Object.entries(errors).length === 0);
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
    console.log({
      ...dados,
      unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
      especialidades: JSON.parse(dados?.especialidades || '[]'),
      categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}'),
    });
    const resposta = await cadastrarUsuario({
      ...dados,
      unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
      especialidades: JSON.parse(dados?.especialidades || '[]'),
      categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}'),
    });
    return resposta.data;
  };

  const aposCadastro = async resultado => {
    if (resultado.sucesso) {
      const dados = tratarDadosCadastro(getValues());

      await signIn(dados.email, dados.senha);

      navigation.navigate('TelaDeSucesso', {
        textoApresentacao:
          'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.',
        telaDeRedirecionamento: 'HOME',
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
      minLength: { value: 8, message: textos.formularioSenha.erroTamanho },
    });
    register('repetirsenha', {
      required: true,
      validate: repetirsenha =>
        repetirsenha === getValues('senha') ||
        textos.formularioSenha.erroIguais,
    });
  }, [register]);

  return (
    <Scroll>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <Titulo>{textos.formularioSenha.introducao}</Titulo>
      <TituloDoFormulario>{textos.formularioSenha.titulo}</TituloDoFormulario>
      <CampoDeTexto
        label="Senha"
        name="senha"
        secureTextEntry
        onChangeText={text => alteraValor('senha', text)}
        mode="outlined"
        theme={theme}
      />
      {errors.senha && <TextoDeErro>{errors.senha.message}</TextoDeErro>}
      <CampoDeTexto
        label="Confirmação de senha"
        name="repetirsenha"
        secureTextEntry
        underlineColor="#BDBDBD"
        onChangeText={text => alteraValor('repetirsenha', text)}
        mode="outlined"
        theme={theme}
      />
      {errors.repetirsenha && (
        <TextoDeErro>{errors.repetirsenha.message}</TextoDeErro>
      )}
      <Botao
        cor="#304FFE"
        disabled={!botaoAtivo}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        loading={carregando}
        onPress={async () => {
          setCarregando(true);
          try {
            const resultado = await realizarCadastroDoUsuario();
            aposCadastro(resultado);
            setCarregando(false);
            analyticsData(
              labelsAnalytics.FINALIZAR_MEU_CADASTRO,
              'Click',
              'Perfil',
            );
            analyticsCategoria(categoriaProfissional, now, 'Cadastro');
            analyticsUnidadeServico(uniServ, now, 'Cadastro');
          } catch (err) {
            console.log(err);
            setCarregando(false);
          }
        }}>
        Finalizar
      </Botao>
      <Alerta
        visivel={cadastroRealizado}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setCadastroRealizado(false)}
      />
    </Scroll>
  );
}
