import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://localhost:5000"; // adjust as needed

const api = axios.create({
  baseURL: backendUrl,
});

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use navigate if inside React
    }
    return Promise.reject(error);
  }
);

export default api;
