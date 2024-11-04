import axios, {AxiosError} from 'axios';
import {appState, logout} from '../zustand';
import {ToastAndroid} from 'react-native';
const isProd = process.env.NODE_ENV !== 'development';
const localIP =
  // '192.168.0.105';
  '10.0.2.2';

export const localServerURL = `http://${localIP}:5000`;
export const API_VERSION = 'v2';

export const baseURL = isProd
  ? process.env.SERVER_API_URL + `/${API_VERSION}`
  : `http://${localIP}:5000/api/${API_VERSION}`;

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

const maxRetries = 2;

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // appState.setState({
    //   serverStatus: 'reachable',
    // });
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.code === 'ERR_NETWORK') {
      appState.setState({
        serverStatus: 'unreachable',
      });
    }
    if (error.response.status === 401) {
      ToastAndroid.show(
        'Your session expired.\nPlease sign in.',
        ToastAndroid.SHORT,
      );
      logout();
    }
    if (error.response.status === 403) {
      try {
        await refreshToken();
        const config = error.config;
        if (!config || !config.retryCount) config.retryCount = 0;
        if (config.retryCount < maxRetries) {
          config.retryCount += 1;
          console.log(`Retrying request... (${config.retryCount})`);
          const res = await axios(config); // Retry request
          config.retryCount = 0;
          return res;
        }
      } catch (err) {
        throw err;
      }
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => api.get('/auth/refresh-token');
