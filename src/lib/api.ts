import axios from 'axios';

const USE_DIRECT = import.meta.env.VITE_API_DIRECT === '1';
const useProxy = import.meta.env.DEV && !USE_DIRECT;

export const API_BASE = useProxy ? '/api2/ka' : 'https://api2.myauto.ge/ka';
export const STATIC_BASE = useProxy ? '/static-my/myauto' : 'https://static.my.ge/myauto';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { Accept: 'application/json' },
});

export const staticApi = axios.create({
  baseURL: STATIC_BASE,
  headers: { Accept: 'application/json' },
});
