import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
export default function View() {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 5;
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const offset = (pageNumber - 1) * tasksPerPage;
        const res = await axios.get("http://localhost:5000/task/all-tasks", {
          params: { limit: tasksPerPage, offset: offset, sort: sort },
        });
        setTasks(res.data.tasks);
        setTotalTasks(res.data.totalTasks);
      } catch (error) {
        console.error("Error fetching  tasks:", error);
      }
    };
    fetchTasks();
  }, [pageNumber, sort]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };
  const handleAsc = () => {
    setSort("ASC");
  };
  const handleDesc = () => {
    setSort("DESC");
  };
  return (
    <div>
      <Button onClick={handleDesc} variant="contained">Sort(low to high)</Button>
      <Button onClick={handleAsc} variant="outlined" sx={{marginLeft:'5px'}} >Sort(high to low)</Button>

      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((item, index) => <p key={index}>{item.name}</p>)
      ) : (
        <p>No tasks available</p>
      )}
      <Pagination
        count={Math.ceil(totalTasks / tasksPerPage)}
        page={pageNumber}
        onChange={handlePageChange}
      />
    </div>
  );
}
