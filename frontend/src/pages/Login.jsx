import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css";
// import axios from "axios";
import api from "../Axios/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();  // page reloading sy bachny k liye use krty hain
    try
    {
      // response ka obj banaya axios.API ki jis k parameters hain url of the API and body
        const response = await api.post('/auth/login', {email,password})
       console.log(response.data.message)
       
       alert(response.data.message)

       localStorage.setItem("token",response.data.token);
       localStorage.setItem("role", response.data.role);

       navigate("/"); // navigate to home

    }
    catch(err)
    {
      alert(err)
    }

    // if (!email || !password) {
      // alert("Please fill in all fields");
      // return;
    // }

    // Temporary login (replace with backend later)
    // localStorage.setItem("token", "dummy_token");

    // alert("Login Successful!");

  };

  return (
    <div className="container">
      <div className="form-box">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <Link to="/forgetPassword">Forgot Password?</Link>
          </div>

          <button type="submit">
            Login
          </button>

          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;