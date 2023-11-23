import axios from "axios";

const createAuthService = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/auth",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const loginUser = (user) => {
    return axiosInstance.post("/authenticate", user);
  };

  const logoutUser = () => {
    return axiosInstance.post("/logout");
  };

  const registerUser = (user) => {
    return axiosInstance.post("/register", user);
  };

  const refreshToken = () => {
    return axiosInstance.post("/refresh-token");
  };

  return {
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
  };
};

export default createAuthService;
