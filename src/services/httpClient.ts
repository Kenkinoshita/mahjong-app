import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !['/login', '/register'].includes(window.location.pathname)) {
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);
