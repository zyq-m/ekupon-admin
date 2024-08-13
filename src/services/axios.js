import axios from "axios";
import { renewToken } from "../api/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// Axios interceptor handle access token authentication
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Handle refreshToken
// Resource: https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await renewToken();
      // Store access token in local storage
      localStorage.setItem("access-token", token.data.accessToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.data.accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
