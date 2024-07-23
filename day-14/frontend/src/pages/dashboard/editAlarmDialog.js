import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

export default function AlarmDialog({ open, onClose, alarmData, onSave }) {
  const [text, setText] = React.useState(alarmData?.text || "");
  const [dateTime, setDateTime] = React.useState(alarmData?.dateTime || "");

  const handleSave = () => {
    onSave({ text, dateTime });
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
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
            required
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
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
