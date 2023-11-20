import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
