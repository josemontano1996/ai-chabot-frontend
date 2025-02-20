import axios from "axios";
import { getCookie } from "./cookies";
import { authTokenCookieName } from "@/consts/cookies";

export const apiRest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiRest.interceptors.request.use(
  (config) => {
    const authtoken = getCookie(authTokenCookieName); // Replace with your cookie name

    if (authtoken) {
      config.headers.Authorization = `Bearer ${authtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
