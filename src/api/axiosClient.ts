import axios from "axios";
import { applySharedRequestPolicy } from "./requestPolicy";
import { logout } from "../utils/auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => applySharedRequestPolicy(config));

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
