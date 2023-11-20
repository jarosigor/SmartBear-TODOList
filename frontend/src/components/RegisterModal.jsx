import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RegisterModal = ({ onRegister, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    onRegister(username, password);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>RegisterModal</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleRegister} color="primary">
          RegisterModal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
