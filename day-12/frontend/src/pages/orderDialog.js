// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import MenuItem from "@mui/material/MenuItem";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UpdateContext } from "../adminContext";
// import { useContext } from "react";
// export default function FormDialog({ open, setOpen }) {
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const placeOrder = () => {
//     toast.info(`Order Placed`);
//     setOpen(false);
//   };
//   return (
//     <React.Fragment>
//       <Button variant="outlined">Open form dialog</Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: "form",
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             console.log(formJson);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>Fill in Order Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="houseNumber"
//             name="houseNumber"
//             label="House Number"
//             type="text"
//             fullWidth
//             variant="outlined"
//           />
//           <TextField
//             required
//             margin="dense"
//             id="locality"
//             name="locality"
//             label="Locality"
//             type="text"
//             fullWidth
//             variant="outlined"
//           />
//           <TextField
//             required
//             margin="dense"
//             id="city"
//             name="city"
//             label="City"
//             type="text"
//             fullWidth
//             variant="outlined"
//           />
//           <TextField
//             required
//             margin="dense"
//             id="pinCode"
//             name="pinCode"
//             label="Pin Code"
//             type="text"
//             fullWidth
//             variant="outlined"
//           />
//           <TextField
//             required
//             margin="dense"
//             id="paymentMethod"
//             name="paymentMethod"
//             label="Payment Method"
//             select
//             fullWidth
//             variant="outlined"
//           >
//             <MenuItem value="Credit Card">Credit Card</MenuItem>
//             <MenuItem value="Debit Card">Debit Card</MenuItem>
//             <MenuItem value="Net Banking">Net Banking</MenuItem>
//             <MenuItem value="COD">Cash On Delivery</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit" onClick={placeOrder}>
//             Confirm
//           </Button>
//         </DialogActions>
//         <ToastContainer />
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UpdateContext } from "../adminContext";
import { useContext } from "react";
export default function FormDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const { cartId } = useContext(UpdateContext);

  const placeOrder = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const address = `${formJson.houseNumber}, ${formJson.locality}, ${formJson.city}, ${formJson.pinCode}`;
    const paymentMethod = formJson.paymentMethod;

    axios
      .post("http://localhost:5000/user/make-order", {
        address: address,
        paymentMethod: paymentMethod,
        cartId: cartId,
        userId: cartId,
      })
      .then((response) => {
        toast.success("Order Placed Successfully", {
          autoClose: 3000,
          transition: Slide,
        });
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Failed to Place Order");
        console.error("There was an error placing the order!", error);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: placeOrder,
        }}
      >
        <DialogTitle>Fill in Order Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="houseNumber"
            name="houseNumber"
            label="House Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="locality"
            name="locality"
            label="Locality"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="city"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="pinCode"
            name="pinCode"
            label="Pin Code"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="paymentMethod"
            name="paymentMethod"
            label="Payment Method"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="Net Banking">Net Banking</MenuItem>
            <MenuItem value="COD">Cash On Delivery</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>
    </React.Fragment>
  );
}
