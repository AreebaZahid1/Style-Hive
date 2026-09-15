import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css";
// import axios from "axios";
import api from "../Axios/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // const [profilePicture, setProfilePicture] = useState(null);

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post(
            "/auth/register",
            {
                name,
                email,
                number,
                password,
                country,
                city,
                postalCode
            }
        );

        alert(response.data.message);

        navigate("/login");
    } catch (error) {

        console.log(
            "Signup error:",
            error.response?.data || error
        );

        alert(
            error.response?.data?.message ||
            "Error creating account"
        );

    }

};

  return (
    <div className="container">
      <div className="form-box">

        <h2>Create Account</h2>
        <p className="subtitle">Register your account</p>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="03XXXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
           </div>

          <div className="input-group">
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
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
          </div>

          {/* <div className="input-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>setProfilePicture(e.target.files[0])} // e.target.files[0] gets selected image file
            />
          </div> */}

          <button type="submit">
            Sign Up
          </button>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Signup;