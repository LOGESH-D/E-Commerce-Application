import {React, useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";
import api from "../../api/axios.js";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"user",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try{
      await api.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    }
    catch(err){
      alert(err.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>
        <TextField
          label="Name"
          fullWidth
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <TextField
          label="Email"
          fullWidth
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <TextField
          select
          label="Role"
          fullWidth
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
          >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="partner">Partner</MenuItem>
          <MenuItem value="driver">Driver</MenuItem>
        </TextField>


        <Button fullWidth variant="contained" onClick={handleRegister}>Register</Button>
      </div>
    </div>
  )
}

export default Register