import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7110/api",
});

//bshuf eza aande token b localStorage abel ma sewe hayalla crud, eza eh mn zida to request header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
