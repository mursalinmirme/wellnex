import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_DEPLOYMENT_URL,
});
const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.token = localStorage.getItem("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logoutUser();
          navigate("/signin");
          // toast.error("Something went wrong thats why you are loged out.")
        }
      }
    );
  }, [logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
