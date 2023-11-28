import axios from "axios";
import { clearCookie } from "../api/utils";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error, "error tracked in interceptor response");
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        await clearCookie();
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
