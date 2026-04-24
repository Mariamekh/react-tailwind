import axios from 'axios';

const isDev = import.meta.env.DEV;

export const API_BASE = isDev ? '/api2/ka' : 'https://api2.myauto.ge/ka';
export const STATIC_BASE = isDev ? '/static-my/myauto' : 'https://static.my.ge/myauto';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json' },
});

export const staticApi = axios.create({
  baseURL: STATIC_BASE,
  headers: { Accept: 'application/json' },
});
