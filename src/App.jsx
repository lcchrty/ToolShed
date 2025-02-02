import React from "react";
import "./styles.css";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard.jsx";
import Signup from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";
import Profile from "./user/Profile.jsx";
import ReservationForm from "./dashboard/reservation-modal/ReservationForm.jsx";
// for rendering the date/time picker in the calendar in reservation form
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservation" element={<ReservationForm />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
