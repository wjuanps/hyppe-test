import api from "./api";

export default {
  list: async () => await api.get("/events"),
  events: async () => await api.get("/user/events"),
  event: async uuid => await api.get(`/user/events/${uuid}`),
  datail: async uuid => await api.get(`/events/${uuid}`),
  update: async (uuid, params) => await api.put(`/events/${uuid}`, params),
  create: async params => await api.post("/events", params),
  destroy: async uuid => await api.delete(`/events/${uuid}`),
  confirmPresence: async (uuid, params) =>
    await api.put(`/user/events/${uuid}`, params)
};
