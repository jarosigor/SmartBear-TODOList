import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import createAuthService from "../services/AuthService";

const RegisterModal = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleRegister = () => {
    const newUser = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role: "USER",
    };

    const authService = createAuthService();

    authService
      .registerUser(newUser)
      .then((response) => {
        console.log("User registered successfully:", response.data);
        const accessToken = response.data["accessToken"];
        const refreshToken = response.data["refreshToken"];
        localStorage.setItem("jwtToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(localStorage.getItem("jwtToken"));
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
    navigate("/dashboard");
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>RegisterModal</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Firstname"
          type="firstname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Lastname"
          type="lastname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleRegister()} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
