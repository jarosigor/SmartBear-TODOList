import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ProfileModal from "./components/ProfileModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(token);
  }, []);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Dashboard setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        }
      />
      <Route
        path="/login"
        element={
          <LoginModal isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/register"
        element={
          <RegisterModal
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route
        path="/profile"
        element={<ProfileModal isLoggedIn={isLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
