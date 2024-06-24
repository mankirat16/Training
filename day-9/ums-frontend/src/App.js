import "./App.css";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Home from "./pages/home";
import Users from "./pages/users";
import User from "./pages/profile/index";
import { UpdateProvider, UpdateContext } from "./updateContext";
import { createContext, useContext, useEffect, useState } from "react";
import Sections from "./pages/section";
import ViewSection from "./pages/section/ViewSection";
import HomePage from "./homePage";

const navBar = {
  minWidth: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "8vh",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  top: 0,
  backgroundColor: "white",
  cursor:'pointer'
};
function App() {
  const navigate = useNavigate();
  const { update, setUpdate, setId } = useContext(UpdateContext);
  return (
    <div className="App">
      <Box sx={navBar}>
        <Typography variant="h4">AcademiX</Typography>
        <Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setId(null);
                navigate("/add-user");
              }}
            >
              Add Student
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/all-users");
                localStorage.clear();
              }}
              style={{ marginLeft: "5pt" }}
            >
              VIEW STUDENTS
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
                setUpdate(false);
                localStorage.clear();
              }}
              style={{ marginLeft: "5pt" }}
            >
              HOME
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/all-sections");
                setUpdate(false);
              }}
              style={{ marginLeft: "5pt" }}
            >
              VIEW SECTIONS
            </Button>
          </Box>
        </Box>
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-user" element={<Home />} />
        <Route path="/all-users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/updateProfile" element={<Home />} />
        <Route path="/all-sections" element={<Sections />} />
        <Route path="/view-section" element={<ViewSection />} />
      </Routes>
    </div>
  );
}

export default App;
