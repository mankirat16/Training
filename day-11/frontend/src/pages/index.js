import React, { useState } from "react";
import { UpdateContext } from "../ContextProvider";
import { useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
const alertStyles = {
  backgroundColor: "#FF6C71",
  border: "1px solid red",
  padding: "4px",
  borderRadius: "4px",
};
export default function Home() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const { setView } = useContext(UpdateContext);
  const [alert, setAlert] = useState({
    vis: false,
    message: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/book/add-book", {
        name: bookName,
        author: authorName,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "error") {
          setAlert({ vis: true, message: "Author does not exist!" });
          setTimeout(() => {
            setAlert({ vis: false, message: "" });
          }, 2000);
          return;
        }
        setAlert({ vis: true, message: "Book Added successfully!" });
        setTimeout(() => {
          setAlert({ vis: false, message: "" });
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
        setAlert({ vis: true, message: "Internal Server error!" });
        setTimeout(() => {
          setAlert({ vis: false, message: "" });
        }, 2000);
      });
    console.log("Book Name:", bookName);
    console.log("Author Name:", authorName);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          Book Information Form
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="bookName"
            label="Book Name"
            name="bookName"
            autoComplete="bookName"
            autoFocus
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="authorName"
            label="Author Name"
            name="authorName"
            autoComplete="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => {
              window.location.href = "/all-books";
            }}
          >
            View all Books
          </Button>
        </Box>
        {alert.vis && <p style={alertStyles}>{alert.message}</p>}
      </Box>
    </Container>
  );
}
