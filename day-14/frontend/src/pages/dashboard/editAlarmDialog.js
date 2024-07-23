import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import axios from "axios";
import { toast } from "react-toastify";

export default function AlarmDialog({ editDialog, setEditDialog, alarmId }) {
  const [text, setText] = React.useState("");
  const [dateTime, setDateTime] = React.useState("");

  const handleSave = () => {
    axios
      .post("http://localhost:5000/alarm/edit-alarm", {
        id: alarmId,
        text: text,
        dateTime: dateTime,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Alarm updated successfully!");
        setEditDialog(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating alarm. Please try again.");
      });
  };

  const handleClose = () => {
    setEditDialog(false);
  };

  return (
    <Dialog
      open={editDialog}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleSave();
        },
      }}
    >
      <DialogTitle>Edit Alarm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To edit this alarm, please enter the new details below.
        </DialogContentText>
        <Box mb={2} mt={4}>
          <TextField
            autoFocus
            required
            id="text"
            name="text"
            label="Alarm Text"
            type="text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="dateTime"
            name="dateTime"
            label="Date & Time"
            type="datetime-local"
            fullWidth
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
