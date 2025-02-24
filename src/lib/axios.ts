import { authCookie } from "@/hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

export const apiRest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiRest.interceptors.request.use(
  (config) => {
    const authtoken = Cookies.get(authCookie);

    if (authtoken) {
      config.headers.Authorization = `Bearer ${authtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
