import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddCar from "./pages/AddCar";
import CarDetail from "./pages/CarDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protect routes using PrivateRoute */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-car"
          element={
            <PrivateRoute>
              <AddCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/car/:id"
          element={
            <PrivateRoute>
              <CarDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
