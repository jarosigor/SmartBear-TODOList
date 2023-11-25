// ProfileModal.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import createUserDataService from "../services/UserService";

const ProfileModal = ({ isLoggedIn }) => {
  const [open, setOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      handleFetchProfileData();
    }
  }, []);

  const handleFetchProfileData = () => {
    const userService = createUserDataService();

    userService
      .getUser()
      .then((response) => {
        console.log("Fetching user profile successfull: ", response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
      });
  };

  const handleClose = () => {
    navigate("/dashboard");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Email:</strong> {userInfo["email"]}
        </Typography>
        <Typography variant="body1">
          <strong>First Name:</strong> {userInfo["firstname"]}
        </Typography>
        <Typography variant="body1">
          <strong>Last Name:</strong> {userInfo["lastname"]}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {userInfo["role"]}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/dashboard")} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
