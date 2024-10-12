import axios from 'axios';
import {appState} from '../zustand';
const isProd = process.env.NODE_ENV !== 'development';
const localIP = '192.168.0.105';
// '10.0.2.2';

export const baseURL = isProd
  ? process.env.SERVER_API_URL + '/v1'
  : `http://${localIP}:5000/api/v1`;
export const api = axios.create({
  baseURL,
  timeout: 15000,
});

console.log(baseURL, 'BASE_URL');

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error, 'ERROR__REQ_:', error);

    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.code === 'ERR_NETWORK') {
      appState.setState({
        serverStatus: 'unreachable',
      });
    }
    return Promise.reject(error);
  },
);
