import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.dataatwork.org/v1/',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;