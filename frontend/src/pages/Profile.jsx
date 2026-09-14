import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/Auth.css";
import api from "../Axios/api";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setName(res.data.user.name || "");
        setEmail(res.data.user.email || "");
        setNumber(res.data.user.number || "");
        setCountry(res.data.user.country || "");
        setCity(res.data.user.city || "");
        setPostalCode(res.data.user.postalCode || "");
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.put(
        "http://localhost:3000/api/auth/me",
        { name, number, country, city, postalCode, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Profile updated");
      setUser(res.data.user);
      setPassword("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="form-box">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-box">
        <h2>My Profile</h2>
        <p className="subtitle">Edit your account details</p>

        <form onSubmit={handleSave}>
          <div className="input-group">
            <label>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input value={email} disabled />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input value={number} onChange={(e) => setNumber(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="input-group">
            <label>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Postal Code</label>
            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>

          <div className="input-group">
            <label>New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
