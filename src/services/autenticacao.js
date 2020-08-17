// import Config from 'react-native-config';
import {
  salvarDados, pegarDados, removerDados
} from './armazenamento';
// import respostaLogin from '../pages/Login/json/respostaLogin.json';
import { autenticar } from '../apis/apiKeycloak';

// const configuracao = {
//   url: Config.KEYCLOAK_URL,
//   realm: Config.KEYCLOAK_REALM,
//   clientId: Config.KEYCLOAK_CLIENT_ID,
//   redirectUri: Config.KEYCLOAK_REDIRECT_URI,
//   appsiteUri: Config.KEYCLOAK_APPSITE_URI,
// };

async function autenticarComIdSaude(email, senha) {
  try {
    const response = await autenticar(email, senha);
    return response.data;
  } catch (err) {
    throw err;
  }
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
  excluirTokenDoUsuarioNoStorage
};
