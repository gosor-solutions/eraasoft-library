import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://englivision.gosorsolutions.com/api/v1",
});

export default axiosInstance;
