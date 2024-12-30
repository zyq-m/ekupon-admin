import { api } from "../services/axios";

// login
export const login = async (id, password) => {
	const token = await api.post("/auth/login", {
		id: id,
		password: password,
	});

	sessionStorage.setItem("access-token", token.data.accessToken);
	sessionStorage.setItem("refresh-token", token.data.refreshToken);
};

export const renewToken = async () => {
	const refreshToken = sessionStorage.getItem("refresh-token");
	return await api.post("/auth/refresh", {
		refreshToken: refreshToken,
	});
};

export const logout = () => {
	sessionStorage.clear();
};
