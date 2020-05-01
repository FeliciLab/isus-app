import axios from 'axios';

const request = axios.create({
  timeout: 20000,
  baseURL: 'http://165.227.182.4/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default request;
