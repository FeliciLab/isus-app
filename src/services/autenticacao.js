import Login from 'react-native-login-keycloak';
import {
  salvarDados, removerDados, pegarDados, pegarTodasAsChaves
} from './armazenamento';

const configuracao = {
  url: 'https://dev.id.org.br/auth/',
  realm: 'saude',
  clientId: 'isus',
  redirectUri: 'isusapp://isusapp/secured/profile',
  appsiteUri: 'isusapp://',
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
