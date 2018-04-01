import axios from 'axios'
import { DEF } from '../defination';
import { CookieService } from './cookie.service';

const baseURL = process.env.apiEndpoint;
let lang = "ja";
let apiErrorHandler;

export const API = axios.create({
  baseURL: baseURL + '/api/v1/pgClassroom',
  withCredentials: true,
  timeout: 20000
});

// Common Request setting
API.interceptors.request.use(config => {
  config.headers["auth-token"] = CookieService.getAuthToken();
  config.headers[DEF.LanguageCookieKey] = lang;
  return config;
},
  (error) => Promise.reject(error)
);

// Common Response setting
API.interceptors.response.use(undefined, err => {
  if (apiErrorHandler) {
    apiErrorHandler(err);
  }
  if (err.response) {
    return Promise.reject(err.response.data);
  } else {
    return Promise.reject(err);
  }
});