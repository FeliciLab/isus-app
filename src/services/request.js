import axios from 'axios';
import { Config } from 'react-native-config';
import {
  pegarTokenDoUsuarioNoStorage,
  atualizarTokenDeAcessoDoUsuario,
} from './autenticacao';

// TODO: melhorar o nome dessa variável
const request = axios.create({
  timeout: 20000,
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(async req => {
  const token = await pegarTokenDoUsuarioNoStorage();

  if (token) {
    req.headers.Authorization = `Bearer ${token?.accessToken}`;
  }

  return req;
});

request.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      try {
        await atualizarTokenDeAcessoDoUsuario();
        const token = await pegarTokenDoUsuarioNoStorage();
        error.config.headers.Authorization = `Bearer ${token?.accessToken ||
          ''}`;
        return axios.request(error.config);
      } catch (err) {
        console.log(err);
      }
    }
    return Promise.reject(error);
  },
);

export default request;
