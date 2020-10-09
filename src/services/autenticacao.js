// import Config from 'react-native-config';
import {
  salvarDados, pegarDados, removerDados
} from './armazenamento';
import { autenticar, pegarTokenDeAcesso } from '../apis/apiKeycloak';


async function autenticarComIdSaude(email, senha) {
  try {
    const response = await autenticar(email, senha);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function salvarDadosDeCadastro(dados) {
  await salvarDados('cadastro-usuario', dados);
}

async function pegarDadosDeCadastro() {
  const resultado = await pegarDados('cadastro-usuario');
  return resultado;
}

async function pegarTokenDoUsuarioNoStorage() {
  const token = await pegarDados('token_usuario');
  return token;
}

async function salvarTokenDoUsuarioNoStorage(token) {
  await salvarDados('token_usuario', token);
}

async function pegarRefreshTokenDoUsuarioNoStorage() {
  const token = await pegarDados('refresh_token_usuario');
  return token;
}

async function salvarRefreshTokenDoUsuarioNoStorage(token) {
  await salvarDados('refresh_token_usuario', token);
}

async function excluirTokenDoUsuarioNoStorage() {
  await removerDados('token_usuario');
}

async function atualizarTokenDeAcessoDoUsuario() {
  try {
    const refreshToken = await pegarRefreshTokenDoUsuarioNoStorage();
    const resultado = await pegarTokenDeAcesso(refreshToken);
    const { mensagem } = resultado;
    await salvarTokenDoUsuarioNoStorage(mensagem.access_token);
    await salvarRefreshTokenDoUsuarioNoStorage(mensagem.refresh_token);
  } catch (err) {
    console.log(err);
  }
}

async function receberResposta(res) {
  if (res.response.status === 401) {
    await atualizarTokenDeAcessoDoUsuario();
  }
}

export {
  autenticarComIdSaude,
  receberResposta,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  pegarRefreshTokenDoUsuarioNoStorage,
  salvarRefreshTokenDoUsuarioNoStorage,
  excluirTokenDoUsuarioNoStorage,
  salvarDadosDeCadastro,
  pegarDadosDeCadastro,
  atualizarTokenDeAcessoDoUsuario
};
