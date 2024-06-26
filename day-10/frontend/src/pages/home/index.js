import React, { useState } from "react";
import axios from "axios";
export default function Home() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(0);
  const [alert, setAlert] = useState({
    text: "",
    vis: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/task/add-task", {
        name: taskName,
        priority: priority,
      })
      .then((res) => {
        console.log(res);
        setAlert({ text: "Task added successfully", vis: true });
        setTimeout(() => {
          setAlert({ text: "", vis: "false" });
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setAlert({ text: "Internal server error", vis: true });
        setTimeout(() => {
          setAlert({ text: "", vis: "false" });
        }, 3000);
      });
    setTaskName("");
    setPriority("");
  };

  return (
    <div style={styles.container}>
      {alert.vis && <p>{alert.text}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="taskName" style={styles.label}>
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="priority" style={styles.label}>
            Priority
          </label>
          <input
            type="number"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};
