import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateDialog from "./updateOrderStatusDialog";
import AlertDialogSlide from "./confirmationDialog";
export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateId, setUpdateId] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/all-orders")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <Box sx={{ marginTop: 8 }}>
        <UpdateDialog
          updateDialog={updateDialog}
          setUpdateDialog={setUpdateDialog}
          updateId={updateId}
        />
        <AlertDialogSlide
          deleteDialog={deleteDialog}
          setDeleteDialog={setDeleteDialog}
          updateId={updateId}
        />
        <Typography variant="h4" gutterBottom>
          All Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Cart ID</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.cartId}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <IconButton aria-label="view" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => {
                        setUpdateId(order.id);
                        setUpdateDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => {
                        setUpdateId(order.id);
                        setDeleteDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
