import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const { setUser } = useUser(); // useUser hook to set the logged-in user
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      setUser({ id: 1, username }); // Set a static ID for simplicity
      navigate("/stages"); // Navigate to the workflow page after login
    }
  };

  return (
    <div className="login-page">
      <h2>Login to LungoAI</h2>
      <div className="login-page__form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
