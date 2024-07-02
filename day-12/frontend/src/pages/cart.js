import React, { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../adminContext";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Alert from "@mui/material/Alert";

export default function Cart() {
  const { cartId, setCartId } = useContext(UpdateContext);
  const [cartItems, setCartItems] = useState([]);
  const [amt, setAmt] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/view-cart", {
        id: cartId,
      })
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
        let amount = 0;
        res.data.forEach((item) => {
          amount += item.price;
        });
        setAmt(amount);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [cartId]);
  const handleRemove = (item) => {
    axios
      .post("http://localhost:5000/user/remove-from-cart", {
        pId: item.id,
        id: cartId,
      })
      .then((res) => {
        console.log(res.data);
        console.log("Item removed from cart");
        axios
          .post("http://localhost:5000/user/view-cart", {
            id: cartId,
          })
          .then((res) => {
            console.log(res.data, "item delete");
            setCartItems(res.data);
            if (!res.data) {
              setCartEmpty(true);
              setCartItems([]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        {console.log(cartEmpty)}
        {cartEmpty && <Alert severity="info">Nothing to show in cart</Alert>}
        <Grid container spacing={4}>
          {cartItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img || "https://via.placeholder.com/150"}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seller: {item.seller}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      handleRemove(item);
                    }}
                  >
                    Remove from Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: 4, textAlign: "right" }}>
          <Typography variant="h6">Total Amount: ${amt}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
