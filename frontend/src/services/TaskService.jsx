import axios from "axios";

const createTaskService = (token) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const addTask = (task) => {
    return axiosInstance.post(`/add-task`, task);
  };

  const addTasks = (tasks) => {
    return axiosInstance.post(`/add-tasks`, tasks);
  };

  const getTasks = () => {
    return axiosInstance.get(`/tasks`);
  };

  const getTaskById = (id) => {
    return axiosInstance.get(`/task-by-id/${id}`);
  };

  const getTasksByDate = (date) => {
    return axiosInstance.get(`/tasks-by-date/${date}`);
  };

  const deleteTaskById = (id) => {
    return axiosInstance.delete(`/delete-task/${id}`);
  };

  const updateTask = (task) => {
    return axiosInstance.put(`/update-task`, task);
  };

  return {
    addTask,
    addTasks,
    getTasks,
    getTaskById,
    getTasksByDate,
    deleteTaskById,
    updateTask,
  };
};

export default createTaskService;
