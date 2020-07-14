import Login from 'react-native-login-keycloak';

const configuracao = {
  url: 'https://dev.id.org.br/auth/',
  realm: 'saude',
  clientId: 'account',
  redirectUri: 'https://dev.id.org.br/auth/',
  appsiteURi: 'isusapp://login/isus',
};

async function autenticarComIdSaude() {
  try {
    const tokens = await Login.startLoginProcess(configuracao);
    console.log(tokens);
  } catch (err) {
    console.log(err);
  }
}

export default autenticarComIdSaude;
