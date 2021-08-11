import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormContext from '../../context/FormContext';
import { cadastrarUsuario } from '../../apis/apiCadastro';
import Alerta from '../../components/alerta';
import {
  Titulo, Scroll, TituloDoFormulario, CampoDeTexto, TextoDeErro, Botao
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import textos from './textos.json';
import {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  armazenarEstadoLogado
} from '../../services/autenticacao';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { labelsAnalytics } from '../../constantes/labelsAnalytics';
import useAnalytics from '../../hooks/Analytics';
import { analyticsCategoria, analyticsUnidadeServico } from '../../utils/funcoesAnalytics';

export default function FormularioSenha({ navigation }) {
  const { analyticsData } = useAnalytics();
  const [carregando, alterarCarregando] = React.useState(false);
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = React.useState('');
  const [cadastroRealizado, alterarCadastroRealizado] = React.useState(false);
  const { alterarDadosUsuario, alterarEstaLogado } = useContext(AutenticacaoContext);
  const {
    register, setValue, trigger, errors, getValues
  } = useContext(FormContext);

  const valores = getValues();
  const { categoriaProfissional } = valores;
  const uniServ = JSON.parse(valores.unidadeServico);
  const now = Date.now();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#304FFE" />
        </TouchableOpacity>
      )
    });
  });

  const mostrarAlerta = (mensagem) => {
    alterarMensagemDoAlerta(mensagem);
    alterarCadastroRealizado(true);
    setTimeout(() => alterarCadastroRealizado(false), 4000);
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger(['senha', 'repetirsenha']);
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  const tratarDadosCadastro = (dadosCadastro) => {
    const { cidade, cpf, telefone } = dadosCadastro;
    return {
      ...dadosCadastro,
      cidadeId: cidade.id,
      cidade: cidade.nome,
      cpf,
      telefone,
      termos: true
    };
  };

  const realizarCadastroDoUsuario = async () => {
    const dados = tratarDadosCadastro(getValues());
    console.log({
      ...dados,
      unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
      especialidades: JSON.parse(dados?.especialidades || '[]'),
      categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}')
    });
    const resposta = await cadastrarUsuario({
      ...dados,
      unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
      especialidades: JSON.parse(dados?.especialidades || '[]'),
      categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}')
    });
    return resposta.data;
  };

  const aposCadastro = async (resultado) => {
    if (resultado.sucesso) {
      const dados = tratarDadosCadastro(getValues());

      const response = await autenticarComIdSaude(dados.email, dados.senha);
      if (response.sucesso) {
        await salvarTokenDoUsuarioNoStorage(response.mensagem);
        await armazenarEstadoLogado(true);
        await pegarTokenDoUsuarioNoStorage();
        await alterarDadosUsuario(dados);
        await alterarEstaLogado(true);
      }

      navigation.navigate('TelaDeSucesso', { textoApresentacao: 'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.', telaDeRedirecionamento: 'HOME', telaDeBackground: '#304FFE' });
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
    register('senha', { required: true, minLength: { value: 8, message: textos.formularioSenha.erroTamanho } });
    register('repetirsenha', { required: true, validate: repetirsenha => repetirsenha === getValues('senha') || textos.formularioSenha.erroIguais });
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
      {errors.senha && (
        <TextoDeErro>
          { errors.senha.message}
        </TextoDeErro>
      )}
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
        <TextoDeErro>
          {errors.repetirsenha.message}
        </TextoDeErro>
      )}
      <Botao
        cor="#304FFE"
        disabled={!botaoAtivo}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        loading={carregando}
        onPress={async () => {
          alterarCarregando(true);
          try {
            const resultado = await realizarCadastroDoUsuario();
            aposCadastro(resultado);
            alterarCarregando(false);
            analyticsData(
              labelsAnalytics.FINALIZAR_MEU_CADASTRO,
              'Click',
              'Perfil'
            );
            analyticsCategoria(categoriaProfissional, now, 'Cadastro');
            analyticsUnidadeServico(uniServ, now, 'Cadastro');
          } catch (err) {
            console.log(err);
            alterarCarregando(false);
          }
        }}
      >
        Finalizar
      </Botao>
      <Alerta visivel={cadastroRealizado} textoDoAlerta={mensagemDoAlerta} />
    </Scroll>
  );
}
