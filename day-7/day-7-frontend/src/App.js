import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import AllUsers from "./allUsers";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({ name: "", pwd: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addUser", formData)
      .then((response) => {
        setMessage(`User ${formData.name} added to the database.`);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setMessage("An error occurred while adding the user.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const handleViewAll = () => {
    navigate("/all-users");
  };

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password
          </label>
          <input
            id="pwd"
            name="pwd"
            type="password"
            className="form-control"
            value={formData.pwd}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      {console.log(message)}
      {message && <div className="alert alert-info">{message}</div>}
      <button className="btn btn-secondary" onClick={handleViewAll}>
        View All Users
      </button>
      <Routes>
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
    </div>
  );
}

export default App;
