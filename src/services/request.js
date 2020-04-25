import axios from 'axios';

const request = axios.create({
  timeout: 20000,
  // baseURL: 'https:',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default request;
