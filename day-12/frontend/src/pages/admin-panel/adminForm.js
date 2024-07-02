import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminForm() {
  const [form, setForm] = useState({
    name: "",
    img: "",
    seller: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post("http://localhost:5000/product/add-product", form)
      .then((res) => {
        console.log(res);
        toast("Product added");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          name="img"
          value={form.img}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Seller Name"
          name="seller"
          value={form.seller}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
