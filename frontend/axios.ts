// Crear un archivo axios.js (o cualquier nombre que prefieras) en tu directorio de servicios o utilidades
import axios from 'axios';

// Configura la URL base de tu servidor backend
axios.defaults.baseURL = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor

// Configura los encabezados comunes, como el de autorización
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
