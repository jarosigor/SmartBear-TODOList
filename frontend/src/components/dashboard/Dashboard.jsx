import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CircularProgressWithLabel from "../CircularProgressWithLabel";
import TaskList from "../TaskList";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginModal from "../LoginModal";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const darkTheme = createTheme({
  // palette: {
  //   mode: "dark",
  // },
});

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const [allTasksDoneCount, setAllTasksDoneCount] = useState();
  // const [allTasksCount, setAllTasksCount] = useState();
  // const [dayTasksDoneCount, setDayTasksDoneCount] = useState();
  // const [dayTasksCount, setDayTasksCount] = useState();
  const [calendarValue, setCalendarValue] = useState(dayjs());
  const [isLoggedIn, setIsLoggedIn] = useState(/* Check user's login status */);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  const jwtToken = 123;

  const handleLogin = (email, password, firstname, lastname) => {
    // Implement your login logic
    setIsLoggedIn(true);
    localStorage.setItem("jwtToken", jwtToken);
  };

  const handleRegister = () => {
    // Implement your registration logic
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
    localStorage.setItem("jwtToken", jwtToken);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  ToDosuss
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <ListItemButton
                  onClick={() => {
                    setIsLoginModalOpen(true);
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LoginModal
                open={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
              />
              <Box sx={{ display: "flex", flexGrow: 1, height: "700px" }}>
                {/* Task List Component */}
                <Box sx={{ flexGrow: 1, padding: "16px", marginTop: "50px" }}>
                  <TaskList
                    calendarValue={calendarValue}
                    setCalendarValue={setCalendarValue}
                  />
                </Box>

                {/* Calendar Component */}
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    marginBottom: "16px",
                    marginTop: "50px",
                    flex: 1,
                  }}
                >
                  <DateCalendar
                    value={calendarValue}
                    onChange={(newValue) => {
                      setCalendarValue(newValue);
                      console.log(calendarValue);
                    }}
                  />
                </Box>
              </Box>

              {/* Progress Bar Component */}
              <Box sx={{ border: "1px solid #ccc", padding: "16px" }}>
                <CircularProgressWithLabel />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}
