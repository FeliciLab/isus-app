import { autenticar, pegarTokenDeAcesso } from '~/apis/apiKeycloak';
import { pegarDados, removerDados, salvarDados } from './armazenamento';

// TODO: possivel remoção
// Justificativa: todo acesso deve ser efetuado pelo hook de autenticação
function autenticarComIdSaude(username, senha) {
  return autenticar(username, senha);
}

// TODO: possivel remoção
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
  atualizarTokenDeAcessoDoUsuario,
};
