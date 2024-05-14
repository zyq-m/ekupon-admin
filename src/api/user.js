import { api } from "../services/axios";

export const suspend = async (id, active) => {
  return await api.put("/admin/user/suspend", {
    id,
    active,
  });
};
