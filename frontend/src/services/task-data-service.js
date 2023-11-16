import axios from "axios";

// wrapper class for calls
class TaskService {
  constructor() {
    this.axiosIn = axios.create({ baseURL: "http://localhost:8080" });
  }

  addTask(task) {
    console.log("task: " + task);
    return this.axiosIn.post(`/add-task`, task);
  }

  addTasks(tasks) {
    return this.axiosIn.post(`/add-tasks`, tasks);
  }

  getTasks() {
    return this.axiosIn.get(`/tasks`);
  }

  getTaskById(id) {
    return this.axiosIn.get(`/task/${id}`);
  }

  getTaskByTitle(title) {
    return this.axios.get(`/task/${title}`);
  }

  getTasksByDate(date) {
    return this.axiosIn.get(`/tasks/${date}`);
  }

  deleteTaskById(id) {
    return this.axiosIn.delete(`/delete-task/${id}`);
  }

  updateTask(task) {
    console.log(task);
    return this.axiosIn.put(`/update-task`, task);
  }
}

export default TaskService;
