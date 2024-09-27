import axios from 'axios';
const isProd = false;
const localIP = '192.168.0.108' || '10.0.2.2';
export const api = axios.create({
  baseURL: isProd
    ? process.env.SERVER_API_URL + '/v1'
    : `http://${localIP}:5000/api/v1`,
});
