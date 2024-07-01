import "./App.css";
import Home from "./pages";
import { AllBooks } from "./pages/AllBooks";
import { UpdateContext } from "./ContextProvider";
import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const { view } = useContext(UpdateContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
