import React, { Component } from "react";
import ReservationForm from "./ReservationForm.jsx";
import ReservationCard from "./ReservationCard.jsx";

const Login = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <form action="/user/login" method="post">
        <section>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            autofocus
          />
        </section>
        <section>
          <label for="current-password">Password</label>
          <input
            id="current-password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </section>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
