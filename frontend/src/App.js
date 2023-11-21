import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);
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
        element={<LoginModal setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/register"
        element={<RegisterModal setIsLoggedIn={setIsLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
