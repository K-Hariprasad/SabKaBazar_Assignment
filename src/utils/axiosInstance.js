import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  timeoutErrorMessage: "Action timed out! Please try again",
});

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error?.response?.data) {
      return Promise.reject(new Error(error?.response?.data));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;