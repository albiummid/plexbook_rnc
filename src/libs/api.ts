import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.0.106:9999/api/v1',
  baseURL: 'https://cinespire-server.vercel.app/api/v1',
});
