import { api } from "../services/axios";

// login
export const login = async (id, password) => {
  const token = await api.post("/auth/login", {
    id: id,
    password: password,
  });

  localStorage.setItem("access-token", token.data.accessToken);
  localStorage.setItem("refresh-token", token.data.refreshToken);
};

export const renewToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  return await api.post("/auth/token", {
    refreshToken: refreshToken,
  });
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  return await api.post("/auth/logout", {
    refreshToken: refreshToken,
  });
};
