import axios from "axios";
import Cookies from "js-cookie";
import { authTokenCookieName } from "@/consts/cookies";

export const apiRest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiRest.interceptors.request.use(
  (config) => {
    const authtoken = Cookies.get(authTokenCookieName); 

    if (authtoken) {
      config.headers.Authorization = `Bearer ${authtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
