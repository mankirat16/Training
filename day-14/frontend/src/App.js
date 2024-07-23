import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { useContext } from "react";
import { UpdateContext } from "./context";
import Signup from "./pages/auth/signup";
function App() {
  const { isLoggedIn } = useContext(UpdateContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
