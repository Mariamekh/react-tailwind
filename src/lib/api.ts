import axios from 'axios';

const USE_DIRECT = import.meta.env.DEV && import.meta.env.VITE_API_DIRECT === '1';

export const API_BASE = USE_DIRECT ? 'https://api2.myauto.ge/ka' : '/api2/ka';
export const STATIC_BASE = USE_DIRECT ? 'https://static.my.ge/myauto' : '/static-my/myauto';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json' },
});

export const staticApi = axios.create({
  baseURL: STATIC_BASE,
  headers: { Accept: 'application/json' },
});
