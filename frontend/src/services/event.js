import api from "./api";

export default {
  events: async () => await api.get("/user/events"),
  create: async params => await api.post("/events", params)
};
