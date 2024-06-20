import { useState, useEffect } from "react";
import axios from "axios";
import "./AllUsers.css"; // Assuming you're using CSS modules or a global stylesheet
import { useNavigate } from "react-router-dom";
const bufferToArray = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  var base64Image = window.btoa(binary, "src");
  return `data:image/jpeg;base64,${base64Image}`;
};

export default function AllUsers() {
  const navigate = useNavigate();
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
      .delete(`http://localhost:5000/users/${user.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Server error " + err);
      });
  };

  const startEditUser = (user) => {
    setEditingUser(user.id);
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
    <div className="container">
      {!error ? (
        <ol className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <span className="user-name">{user.name}</span>

              {/* {console.log(bufferToArray(user.image.data))} */}
              <span className="user-name">
                {/* <img
                  src={bufferToArray(user.image.data)}
                  width={100}
                  height={100}
                /> */}

              </span>
              <button className="edit-btn" onClick={() => startEditUser(user)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => delUser(user)}> 
                Delete
              </button>
              <button className="btn btn-outline-info" onClick={()=>{
                navigate(`/posts/${user.id}`)
              }}> 
                View all posts
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="error-message">Internal server error!</p>
      )}
      {editingUser && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <h2>Edit User</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="form-input"
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
              className="form-input"
            />
          </label>
          <br />
          <button type="submit" className="submit-btn">
            Update
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
