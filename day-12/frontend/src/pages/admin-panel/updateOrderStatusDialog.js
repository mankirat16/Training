// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";

// export default function UpdateDialog({
//   updateDialog,
//   setUpdateDialog,
//   updateId,
// }) {
//   const [status, setStatus] = React.useState("");

//   const handleClose = () => {
//     setUpdateDialog(false);
//   };

//   const handleChange = (event) => {
//     setStatus(event.target.value);
//   };

//   return (
//     <React.Fragment>
//       <Dialog
//         open={updateDialog}
//         onClose={handleClose}
//         PaperProps={{
//           component: "form",
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             const status = formJson.status;
//             console.log(status);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>Update Order Status</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please select the new status of the order
//           </DialogContentText>
//           <FormControl fullWidth variant="standard" margin="dense">
//             <InputLabel id="status-label">Order Status</InputLabel>
//             <Select
//               labelId="status-label"
//               id="status"
//               name="status"
//               value={status}
//               onChange={handleChange}
//               required
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="accepted">Accepted</MenuItem>
//               <MenuItem value="rejected">Rejected</MenuItem>
//               <MenuItem value="dispatched">Dispatched</MenuItem>
//               <MenuItem value="delivered">Delivered</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Update</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateDialog({
  updateDialog,
  setUpdateDialog,
  updateId,
}) {
  const [status, setStatus] = React.useState("");

  const handleClose = () => {
    setUpdateDialog(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (status) => {
    axios
      .post("http://localhost:5000/user/update-order-status", {
        id: updateId,
        status: status,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Order Status updated to ${status}`);
        handleClose();
      })
      .catch((e) => {
        toast.error("Failed to update order status");
        console.log(e);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={updateDialog}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select the new status</DialogContentText>
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="status-label">Order Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={status}
              onChange={handleChange}
              required
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="dispatched">Dispatched</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("update called");
              handleSubmit(status);
            }}
            color="secondary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
