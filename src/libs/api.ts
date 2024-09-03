import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://10.0.2.2:9999/api/v1',
  baseURL: 'https://cinespire-server.vercel.app/api/v1',
});
