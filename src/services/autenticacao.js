// import Config from 'react-native-config';
import {
  salvarDados, pegarDados, removerDados
} from './armazenamento';
import { autenticar } from '../apis/apiKeycloak';


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

async function excluirTokenDoUsuarioNoStorage() {
  await removerDados('token_usuario');
}

export {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  salvarDadosDeCadastro,
  pegarDadosDeCadastro,
  excluirTokenDoUsuarioNoStorage
};
