import api from "./api";

var isAuthenticated = localStorage.getItem("hyppe_auth_token");

export default {
  isAuthenticated,
  authenticate: async params => await api.post("/authenticate", params)
};
