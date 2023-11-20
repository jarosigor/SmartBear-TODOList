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

const LoginModal = ({ open, onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleLogin = () => {
    // Implement your login logic
    onLogin(email, password, firstname, lastname);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>LoginModal</DialogTitle>
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          LoginModal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
