import axios from "axios";

const HOST = "localhost";
const PORT = 3333;

const AUTH_TOKEN = localStorage.getItem("hyppe_auth_token");

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api/v1`
});

api.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default api;
