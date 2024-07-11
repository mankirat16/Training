// import React, { useContext, useEffect, useState } from "react";
// import { UpdateContext } from "../adminContext";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import Navbar from "./home/navbar";
// export default function Cart() {
//   const { cartId, setCartId } = useContext(UpdateContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [amt, setAmt] = useState(0);
//   const [cartEmpty, setCartEmpty] = useState(false);
//   useEffect(() => {
//     axios
//       .post("http://localhost:5000/user/view-cart", {
//         cartId: cartId,
//       })
//       .then((res) => {
//         // console.log(res.data);
//         const temp = res.data.map((item) => {
//           if (item.qty > 0) return item.productId;
//         });
//         axios
//           .post("http://localhost:5000/user/get-cart", { ids: temp })
//           .then((res) => {
//             // console.log(res, "cart products");
//             setCartItems(res.data);
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//         let amount = 0;
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     axios
//       .post("http://localhost:5000/user/total-amt", { cartId: cartId })
//       .then((res) => {
//         // console.log(res);
//         setAmt(res.data.amount);
//       });
//   }, [amt]);
//   const handleRemove = (item) => {
//     axios
//       .patch("http://localhost:5000/user/remove-from-cart", {
//         productId: item.id,
//         cartId: cartId,
//       })
//       .then((res) => {
//         console.log(res);
//         axios
//           .post("http://localhost:5000/user/total-amt", { cartId: cartId })
//           .then((res) => {
//             // console.log(res);
//             setAmt(res.data.amount);
//           });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   return (
//     <Container>
//       <Navbar />
//       <Box sx={{ marginTop: 8 }}>
//         <Typography variant="h4" gutterBottom marginTop={10}>
//           Your Cart
//         </Typography>
//         {console.log(cartEmpty)}
//         {cartEmpty && <Alert severity="info">Nothing to show in cart</Alert>}
//         <Grid container spacing={4}>
//           {cartItems.map((item) => (
//             <Grid item key={item.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={item.img || "https://via.placeholder.com/150"}
//                   alt={item.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {item.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Seller: {item.seller}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Price: ${item.price}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     color="primary"
//                     variant="outlined"
//                     onClick={() => {
//                       handleRemove(item);
//                     }}
//                   >
//                     Remove from Cart
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ marginTop: 4, textAlign: "right" }}>
//           <Typography variant="h6">Total Amount: ${amt}</Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// import React, { useContext, useEffect, useState } from "react";
// import { UpdateContext } from "../adminContext";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import Navbar from "./home/navbar";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Cart() {
//   const { cartId } = useContext(UpdateContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [amt, setAmt] = useState(0);
//   const [cartEmpty, setCartEmpty] = useState(false);

//   useEffect(() => {
//     axios
//       .post("http://localhost:5000/user/view-cart", {
//         cartId: cartId,
//       })
//       .then((res) => {
//         const temp = res.data.map((item) => {
//           return item.productId;
//         });
//         axios
//           .post("http://localhost:5000/user/get-cart", { ids: temp })
//           .then((res) => {
//             setCartItems(res.data);
//             if (res.data.length === 0) {
//               setCartEmpty(true);
//             }
//           })
//           .catch((e) => {
//             console.log(e);
//           });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     axios
//       .post("http://localhost:5000/user/total-amt", { cartId: cartId })
//       .then((res) => {
//         setAmt(res.data.amount);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, [cartId, amt]);

//   const handleRemove = (item) => {
//     axios
//       .patch("http://localhost:5000/user/remove-from-cart", {
//         productId: item.id,
//         cartId: cartId,
//       })
//       .then((res) => {
//         console.log(res);
//         toast.info(`Quantity of ${item.name} reduced by 1`);
//         setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
//         if (cartItems.length === 1) {
//           setCartEmpty(true);
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     axios
//       .post("http://localhost:5000/user/total-amt", { cartId: cartId })
//       .then((res) => {
//         setAmt(res.data.amount);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   return (
//     <Container>
//       <Navbar />
//       <Box sx={{ marginTop: 8 }}>
//         <Typography variant="h4" gutterBottom marginTop={10}>
//           Your Cart
//         </Typography>
//         {cartEmpty && <Alert severity="info">Nothing to show in cart</Alert>}
//         <Grid container spacing={4}>
//           {cartItems.map((item) => (
//             <Grid item key={item.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={item.img || "https://via.placeholder.com/150"}
//                   alt={item.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {item.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Seller: {item.seller}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Price: ${item.price}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     color="primary"
//                     variant="outlined"
//                     onClick={() => {
//                       handleRemove(item);
//                     }}
//                   >
//                     Remove from Cart
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ marginTop: 4, textAlign: "right" }}>
//           <Typography variant="h6">Total Amount: ${amt}</Typography>
//         </Box>
//       </Box>
//       <ToastContainer />
//     </Container>
//   );
// }

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
import Navbar from "./home/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormDialog from "./orderDialog";

export default function Cart() {
  const { cartId, setCartNumber } = useContext(UpdateContext);
  const [cartItems, setCartItems] = useState([]);
  const [amt, setAmt] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (cartId) {
      fetchCartItems();
      fetchTotalAmount();
    }
  }, [cartId]);

  const fetchCartItems = () => {
    axios
      .post("http://localhost:5000/user/view-cart", { cartId: cartId })
      .then((res) => {
        const temp = res.data.map((item) => item.productId);
        axios
          .post("http://localhost:5000/user/get-cart", { ids: temp })
          .then((res) => {
            setCartItems(res.data);
            setCartEmpty(res.data.length === 0);
            setCartNumber(res.data.length);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchTotalAmount = () => {
    axios
      .post("http://localhost:5000/user/total-amt", { cartId: cartId })
      .then((res) => {
        setAmt(res.data.amount);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const placeOrder = () => {
    setOpen(true);
  };
  const handleRemove = (item) => {
    axios
      .patch("http://localhost:5000/user/remove-from-cart", {
        productId: item.id,
        cartId: cartId,
      })
      .then((res) => {
        toast.info(`Quantity of ${item.name} reduced by 1`);
        setCartItems((prevItems) =>
          prevItems.filter((cartItem) => cartItem.id !== item.id)
        );
        if (cartItems.length === 1) {
          setCartEmpty(true);
        }
        fetchTotalAmount();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Navbar />
      <FormDialog open={open} setOpen={setOpen} />
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom marginTop={10}>
          Your Cart
        </Typography>
        <Button variant="outlined" onClick={placeOrder}>
          Place Order
        </Button>
        {cartEmpty && (
          <Alert severity="info" sx={{ marginTop: 4 }}>
            Nothing to show in cart
          </Alert>
        )}
        <Grid container spacing={4} marginTop={2}>
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
                    onClick={() => handleRemove(item)}
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
      <ToastContainer />
    </Container>
  );
}
