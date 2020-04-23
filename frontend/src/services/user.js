import api from "./api";

export default {
  user: async () => await api.get("/users/uuid"),
  create: async params => await api.post("/users/create", params)
};
