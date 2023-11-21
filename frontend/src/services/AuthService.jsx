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

  const registerUser = (user) => {
    return axiosInstance.post("/register", user);
  };

  return {
    loginUser,
    registerUser,
  };
};

export default createAuthService;
