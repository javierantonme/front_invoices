// src/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Cambia esta URL por la de tu backend
});

// Interceptor para agregar el token en las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
