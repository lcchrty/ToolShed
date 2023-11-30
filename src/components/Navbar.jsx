import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  //placeholder for handleLogout
  const handleLogout = () => {
    //clear any cookies/sessions here
    navigate("/");
  };

  return (
    <div className="flex justify-around items-center padding-5 background-grey color-white">
      <span
        className="dashboardNav"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Tool Wall
      </span>
      <span
        className="Yourshed"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Your Shed
      </span>
      <button
        className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="submit"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
