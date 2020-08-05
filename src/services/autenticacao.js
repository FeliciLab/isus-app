import Login from 'react-native-login-keycloak';
import Config from 'react-native-config';
import {
  salvarDados, removerDados, pegarDados, pegarTodasAsChaves
} from './armazenamento';

const configuracao = {
  url: Config.KEYCLOAK_URL,
  realm: Config.KEYCLOAK_REALM,
  clientId: Config.KEYCLOAK_CLIENT_ID,
  redirectUri: Config.KEYCLOAK_REDIRECT_URI,
  appsiteUri: Config.KEYCLOAK_APPSITE_URI,
};

async function autenticarComIdSaude() {
  await Login.startLoginProcess(configuracao);
  await salvarUsuarioLogadoNoStorage();
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

async function pegarDadosDeUsuarioNoIdSaude() {
  const dadosDoUsuario = await Login.retrieveUserInfo();
  return dadosDoUsuario;
}

async function salvarUsuarioLogadoNoStorage() {
  try {
    const dadosDoUsuario = await pegarDadosDeUsuarioNoIdSaude();
    await salvarDados('@usuario-logado', {
      inscricao: dadosDoUsuario.sub,
      nome: `${dadosDoUsuario.given_name} ${dadosDoUsuario.family_name}`,
      email: dadosDoUsuario.email
    });
  } catch (err) {
    console.log(err);
  }
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
  pegarDadosDeUsuarioNoStorage,
  pegarTokensSalvosNoDispositivo,
  fazerLogoutDoIdSaude
};
