// import Config from 'react-native-config';
import {
  salvarDados, pegarDados
} from './armazenamento';

import request from './request';
import respostaLogin from '../pages/Login/json/respostaLogin.json';


async function autenticarComIdSaude(email, senha) {
  if (email === 'teste@teste.com' && senha === '12345678') {
    return respostaLogin;
  }
  throw new Error('Usuário incorreto');
}

async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  return resultado.data;
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

export {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  pegarListaDeServicos,
  salvarDadosDeCadastro,
  pegarDadosDeCadastro
};
