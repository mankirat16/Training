import { useState, useEffect } from "react";
import axios from "axios";
export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
  const [editForm, setEditForm] = useState({ name: "", pwd: "" }); // State for the edit form
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [users]);
  const delUser = (user) => {
    axios
      .delete(`http://localhost:5000/users/${user._id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Server error " + err);
      });
  };
  const startEditUser = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, pwd: "" });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...editingUser, ...editForm };

    axios
      .put(`http://localhost:5000/users/${editingUser}`, updatedUser)
      .then((res) => {
        console.log(res);
        setEditingUser(null); // Reset the editing state
      })
      .catch((err) => {
        console.log("Server error " + err);
      });
  };
  return (
    <div>
      {!error ? (
        <ol>
          {users.map((user) => (
            <li key={user._id}>
              {user.name}{" "}
              <button onClick={() => startEditUser(user)}>Edit</button>{" "}
              <button onClick={() => delUser(user)}>Delete</button>
            </li>
          ))}
        </ol>
      ) : (
        <p>Internal server error!</p>
      )}
      {editingUser && (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit User</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="pwd"
              value={editForm.pwd}
              onChange={handleEditChange}
            />
          </label>
          <br />
          <button type="submit">Update</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}
