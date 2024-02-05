/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: AxiosRequestConfig) {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

axios.interceptors.request.use(authRequestInterceptor as never);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
