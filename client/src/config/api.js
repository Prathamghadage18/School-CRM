import axios from "axios";
import store from "../redux/store"; // import your Redux store

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // access Redux state directly
    const token = state.auth.token; // adjust path if different (authSlice)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;