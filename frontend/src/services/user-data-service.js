import http from "../http-common";

class UserDataService {
  addUser(user) {
    return http.post("/add-user", user);
  }
  getUserById(id) {
    http.get("/get-user/${id}");
  }
  getUserByEmail(email) {
    http.get("/get-user/${email}");
  }
  getUsers() {
    http.get("/get-users");
  }
  deleteUserById(id) {
    http.delete("/delete-user/${id}");
  }
  updateUser(user) {
    http.put("/update-user", user);
  }
}

export default UserDataService;
