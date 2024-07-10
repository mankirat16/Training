import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AlertDialog from "./cancelDialog";

export default function Body() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/all-orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [openCancelDialog]);

  return (
    <Box sx={{ padding: 4 }}>
      <AlertDialog
        setOpenCancelDialog={setOpenCancelDialog}
        openCancelDialog={openCancelDialog}
        orderId={orderId}
      />
      <Typography variant="h4" gutterBottom>
        All Orders
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Cart ID</TableCell>
                <TableCell>Address</TableCell>
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
                  <TableCell>{order.cartId}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status !== "cancelled" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setOrderId(order.id);
                          setOpenCancelDialog(true);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
