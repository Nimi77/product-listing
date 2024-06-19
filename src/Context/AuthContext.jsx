import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error.response && error.response.data ? error.response.data : error);
    }
)
export default axiosInstance;