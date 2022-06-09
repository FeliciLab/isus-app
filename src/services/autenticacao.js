import { salvarDados, pegarDados, removerDados } from './armazenamento';
import { autenticar, pegarTokenDeAcesso } from '~/apis/apiKeycloak';

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
export const efetuarAcesso = async ({ username, senha }) => {
  const response = await autenticarComIdSaude(username, senha);
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

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
export const armazenarEstadoLogado = estado =>
  salvarDados('usuario-logado', estado);

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
export const pegarEstadoLogadoArmazenado = () => pegarDados('usuario-logado');

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
function autenticarComIdSaude(username, senha) {
  return autenticar(username, senha);
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
async function salvarDadosDeCadastro(dados) {
  await salvarDados('cadastro-usuario', dados);
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
async function pegarDadosDeCadastro() {
  const resultado = await pegarDados('cadastro-usuario');
  return resultado;
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
async function pegarTokenDoUsuarioNoStorage() {
  const token = await pegarDados('@isus:token');
  return token;
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
function salvarTokenDoUsuarioNoStorage(token) {
  return salvarDados('@isus:token', token);
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
async function excluirTokenDoUsuarioNoStorage() {
  await removerDados('@isus:token');
}

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
async function atualizarTokenDeAcessoDoUsuario() {
  try {
    const token = await pegarTokenDoUsuarioNoStorage();
    const resultado = await pegarTokenDeAcesso(token?.refreshToken);
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
