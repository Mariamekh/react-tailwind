import axios from 'axios';

export const API_BASE = 'https://api2.myauto.ge/ka';
export const STATIC_BASE = 'https://static.my.ge/myauto';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json' },
});

export const staticApi = axios.create({
  baseURL: STATIC_BASE,
  headers: { Accept: 'application/json' },
});
