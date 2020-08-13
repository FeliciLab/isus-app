import request from '../services/request';

export default function autenticar(email, senha) {
  return request.post('auth', { email, senha });
}
