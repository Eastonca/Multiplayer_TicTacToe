import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const login = () => {
    Axios.post("http://localhost:3001/login", { username, password }).then(
      (res) => {
        const { token, userId, firstName, lastName, username, hashedPassword } =
          res.data;

        if (!token) {
          console.log("Login failed: No token returned");
          return;
        }

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      }
    );
  };
  return (
    <div className="login">
      <label>Login</label>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
