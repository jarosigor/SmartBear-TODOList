// LoginModal.js
import React, { useEffect, useState } from "react";
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

const LoginModal = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });

  const handleClose = () => {
    navigate("/dashboard");
    setOpen(false);
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
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error logging user in", error);
        console.log(user);
      });
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
        <Button onClick={() => navigate("/register")} color="secondary">
          Register
        </Button>
        <Button onClick={() => handleLogin()} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
