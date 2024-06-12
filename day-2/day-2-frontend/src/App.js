import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AllUsers from "./allUsers";
import axios from "axios";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {};
    obj.name = e.target[0].value;
    obj.pwd = e.target[1].value;
    console.log(obj, "obj");
    axios.post("http://localhost:5000/addUser", obj).then((response) => {
      console.log(`user ${obj.name} added to db...`);
    });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        Username : <input name="name" type="text" />
        <br />
        <br />
        Password : <input name="pwd" type="password" />
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
      <button
        onClick={() => {
          window.location.href = "/all-users";
        }}
      >
        View all
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
