import { salvarDados, pegarDados, removerDados } from './armazenamento';
import { autenticar, pegarTokenDeAcesso } from '~/apis/apiKeycloak';

export const efetuarAcesso = async ({ email, senha }) => {
  const response = await autenticarComIdSaude(email, senha).then();
  if (!response.sucesso) {
    return {
      erro: true,
      msg: response.erros ? response.erros : response.mensagem,
    };
  }
  await salvarTokenDoUsuarioNoStorage(response.mensagem);
  const token = await pegarTokenDoUsuarioNoStorage();
  return { erro: false, token };
};

export const armazenarEstadoLogado = estado =>
  salvarDados('usuario-logado', estado);
export const pegarEstadoLogadoArmazenado = () => pegarDados('usuario-logado');

function autenticarComIdSaude(email, senha) {
  return autenticar(email, senha);
}

async function salvarDadosDeCadastro(dados) {
  await salvarDados('cadastro-usuario', dados);
}

async function pegarDadosDeCadastro() {
  const resultado = await pegarDados('cadastro-usuario');
  return resultado;
}

async function pegarTokenDoUsuarioNoStorage() {
  const token = await pegarDados('@isus:token');
  return token;
}

function salvarTokenDoUsuarioNoStorage(token) {
  return salvarDados('@isus:token', token);
}

async function excluirTokenDoUsuarioNoStorage() {
  await removerDados('@isus:token');
}

async function atualizarTokenDeAcessoDoUsuario() {
  try {
    const token = await pegarTokenDoUsuarioNoStorage();
    const resultado = await pegarTokenDeAcesso(token.refresh_token);
    if (!resultado.sucesso) {
      await excluirTokenDoUsuarioNoStorage();
    }
    const { mensagem } = resultado;
    await salvarTokenDoUsuarioNoStorage(mensagem);
  } catch (err) {
    console.log(err);
  }
}

export {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  excluirTokenDoUsuarioNoStorage,
  salvarDadosDeCadastro,
  pegarDadosDeCadastro,
  atualizarTokenDeAcessoDoUsuario,
};
