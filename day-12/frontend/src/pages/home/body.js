import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { UpdateContext } from "../../adminContext";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function Body() {
  const [products, setProducts] = useState([]);
  const { cartId } = useContext(UpdateContext);
  const navigate = useNavigate();
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    console.log(cartId);
    axios
      .get("http://localhost:5000/product/all-products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleSort = (e) => {
    if (sorted) {
      axios
        .get("http://localhost:5000/product/all-products")
        .then((res) => {
          console.log(res);
          setProducts(res.data);
          setSorted(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .get("http://localhost:5000/product/sort-products")
        .then((res) => {
          console.log(res);
          setProducts(res.data);
          setSorted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleAddToCart = (productId) => {
    if (!cartId) return;
    axios
      .post("http://localhost:5000/user/add-to-cart", {
        pId: productId,
        id: cartId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        All Products
      </Typography>
      <FormControlLabel
        control={<Switch />}
        label="Sort By Price"
        onClick={handleSort}
      />
      {console.log(sorted, "sort")}
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/cart");
        }}
      >
        View Cart
      </Button>
      <Grid container spacing={4} marginTop={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.img || "https://via.placeholder.com/150"}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Seller: {product.seller}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
