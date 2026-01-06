import React from "react";
import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import api from "../../api/axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <TextField
          fullWidth
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
