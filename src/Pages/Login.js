import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const initialValues = {
    username,
    password,
  };
  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(process.env.REACT_APP_API_URL, initialValues)
        .then((res) => {
          navigate("/admin");
          toast.success(res.data.auth);
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Invalid Credentials");
        });
    } catch (error) {
      toast.error("Authentication Failed");
    }

    resetForm();
  };

  return (
    <div className="login">
      <h1>Admin Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="form-btn">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
