import axios from "axios";

const BASE_URL = "https://api.epharma4u.com/api/v1";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location = "/";
    }
    return Promise.reject(error);
  }
);

export const setPrivateHeaders = () => {
  const token = localStorage.getItem("token");
  axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
