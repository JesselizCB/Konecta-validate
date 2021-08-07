import axios from "axios";
import store from '../store'

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;