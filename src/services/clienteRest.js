import { pegarTokenDoUsuarioNoStorage } from './autenticacao';
import request from './request';

function montarCabecalho() {
  request.interceptors.request.use(async (req) => {
    const token = await pegarTokenDoUsuarioNoStorage();
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
  return request;
}

async function get(url, params = {}) {
  const response = await montarCabecalho().get(url, {
    params
  });
  return response;
}

async function post(url, body = {}) {
  const response = await montarCabecalho().post(url, body);
  return response;
}

async function put(url, params = {}, body = {}) {
  const response = await montarCabecalho().put(url, body, {
    params
  });
  return response;
}

export {
  get,
  post,
  put
};
