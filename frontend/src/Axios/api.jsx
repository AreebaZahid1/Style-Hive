import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL || "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;