import axios from "axios";

const axiosConfig = {
  baseURL: `/api`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};
const apiClient = axios.create(axiosConfig);
const fetchClient = axios.create(axiosConfig);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) => fetchClient.get(url).then((res) => res.data);

export default apiClient;
