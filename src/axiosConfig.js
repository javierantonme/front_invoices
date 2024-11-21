import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //  URL backend
});

// Interceptor para agregar el token en las solicitudes
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); // Parsea la cadena a un objeto
    const token = user?.token; // Extrae el token del objeto
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Token not found");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
