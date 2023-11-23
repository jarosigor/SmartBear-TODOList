// LoginModal.js
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

const LoginModal = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    const authService = createAuthService();

    authService
      .loginUser(user)
      .then((response) => {
        console.log("User logged in successfully:", response.data);
        const jwtToken = response.data["accessToken"];
        const refreshToken = response.data["refreshToken"];
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(localStorage.getItem("jwtToken"));
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error logging user in", error);
        console.log(user);
      });

    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleLogin()} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
