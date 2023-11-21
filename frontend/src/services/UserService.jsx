import axios from "axios";

const createUserDataService = (token) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const getUserById = (id) => {
    return axiosInstance.get(`/get-user/${id}`);
  };

  const getUserByEmail = (email) => {
    return axiosInstance.get(`/get-user/${email}`);
  };

  const getUsers = () => {
    return axiosInstance.get("/get-users");
  };

  const deleteUserById = (id) => {
    return axiosInstance.delete(`/delete-user/${id}`);
  };

  const updateUser = (user) => {
    return axiosInstance.put("/update-user", user);
  };

  return {
    getUserById,
    getUserByEmail,
    getUsers,
    deleteUserById,
    updateUser,
  };
};

export default createUserDataService;
