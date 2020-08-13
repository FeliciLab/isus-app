import request from '../services/request';

export function autenticar(email, senha) {
  return request.post('auth', { email, senha });
}

export function logout(token) {
  return request.post('logout', { refresh_token: token.refresh_token }, { headers: { Authorization: `Bearer ${token.access_token}` } });
}
