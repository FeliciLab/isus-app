import axios from 'axios';

const request = axios.create({
  timeout: 20000,
  baseURL: 'https://apiisus.inova.esp.br/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default request;
