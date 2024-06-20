import "./App.css";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/home";
import Users from "./pages/users";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h2>User Management Systems</h2>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/home");
          }}
        >
          Add User
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/all-users");
          }}
          style={{ marginLeft: "5pt" }}
        >
          View Users
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
          style={{ marginLeft: "5pt" }}
        >
          HOME
        </Button>
      </Box>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/all-users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
