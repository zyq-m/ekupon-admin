import { api } from "../services/axios";

export const suspend = async (id, active) => {
	return await api.put("/auth/suspend", {
		id,
		active: !active,
	});
};
