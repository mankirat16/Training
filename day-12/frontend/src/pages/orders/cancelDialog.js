// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// export default function AlertDialog({
//   openCancelDialog,
//   setOpenCancelDialog,
//   orderId,
// }) {
//   const handleClose = () => {
//     setOpenCancelDialog(false);
//   };
//   const handleCancel = () => {
//     console.log("order ccancelled");
//     axios
//       .post("http://localhost:5000/user/cancel-order", {
//         id: orderId,
//       })
//       .then((res) => {
//         console.log(res);
//         setOpenCancelDialog(false);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   return (
//     <React.Fragment>
//       <Dialog
//         open={openCancelDialog}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         {console.log(orderId, "order id")}
//         <DialogTitle id="alert-dialog-title">
//           {"Are you sure you want to cancel your order ? "}
//         </DialogTitle>
//         <DialogContent></DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>GO BACK</Button>
//           <Button onClick={handleCancel} autoFocus>
//             CANCEL ORDER
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlertDialog({
  openCancelDialog,
  setOpenCancelDialog,
  orderId,
}) {
  const handleClose = () => {
    setOpenCancelDialog(false);
  };

  const handleCancel = () => {
    axios
      .post("http://localhost:5000/user/cancel-order", {
        id: orderId,
      })
      .then((res) => {
        console.log(res);
        toast.success("Order cancelled successfully!");
        setOpenCancelDialog(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error occurred while cancelling the order.");
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={openCancelDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {console.log(orderId)}
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel your order?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            GO BACK
          </Button>
          <Button onClick={handleCancel} variant="contained" color="secondary">
            CANCEL ORDER
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
