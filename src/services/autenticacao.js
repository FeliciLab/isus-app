import Login from 'react-native-login-keycloak';
// import Config from 'react-native-config';
import {
  salvarDados, removerDados, pegarDados, pegarTodasAsChaves
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

async function fazerLogoutDoIdSaude() {
  try {
    const deslogou = await Login.logoutKc();
    if (!deslogou) {
      await removerDados('react-native-keycloak-tokens');
    }
    await removerUsuarioLogado();
  } catch (err) {
    console.log(err);
  }
}

async function pegarTokensSalvosNoDispositivo() {
  try {
    const tokensSalvos = await Login.getTokens();
    console.log('tokens =>', tokensSalvos);
  } catch (err) {
    console.log(err);
  }
}

// async function pegarDadosDeUsuarioNoIdSaude() {
//   const dadosDoUsuario = await Login.retrieveUserInfo();
//   return dadosDoUsuario;
// }

async function pegarTokenDoUsuarioNoStorage() {
  const token = await pegarDados('token_usuario');
  return token;
}

async function salvarTokenDoUsuarioNoStorage(token) {
  await salvarDados('token_usuario', token);
}

async function removerUsuarioLogado() {
  try {
    await removerDados('@usuario-logado');
  } catch (err) {
    console.log(err);
  }
}

async function pegarDadosDeUsuarioNoStorage() {
  try {
    const dadosDoUsuario = await pegarDados('@usuario-logado');
    const chaves = await pegarTodasAsChaves();
    console.log('storage: ', dadosDoUsuario);
    console.log('chaves: ', chaves);

    return dadosDoUsuario;
  } catch (err) {
    throw err;
  }
}

export {
  autenticarComIdSaude,
  salvarTokenDoUsuarioNoStorage,
  pegarTokenDoUsuarioNoStorage,
  pegarDadosDeUsuarioNoStorage,
  pegarTokensSalvosNoDispositivo,
  fazerLogoutDoIdSaude
};
