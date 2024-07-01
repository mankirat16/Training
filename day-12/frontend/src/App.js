import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/admin-panel";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin-panel" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
