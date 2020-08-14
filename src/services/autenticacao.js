// import Config from 'react-native-config';
import {
  salvarDados, pegarDados
} from './armazenamento';
import respostaLogin from '../pages/Login/json/respostaLogin.json';

// const configuracao = {
//   url: Config.KEYCLOAK_URL,
//   realm: Config.KEYCLOAK_REALM,
//   clientId: Config.KEYCLOAK_CLIENT_ID,
//   redirectUri: Config.KEYCLOAK_REDIRECT_URI,
//   appsiteUri: Config.KEYCLOAK_APPSITE_URI,
// };

async function autenticarComIdSaude(email, senha) {
  if (email === 'teste@teste.com' && senha === '12345678') {
    return respostaLogin;
  }
  throw new Error('Usuário incorreto');
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
  salvarDadosDeCadastro,
  pegarDadosDeCadastro
};
