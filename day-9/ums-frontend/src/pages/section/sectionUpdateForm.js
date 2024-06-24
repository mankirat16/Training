// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// export default function SectionUpdateFormDialog({
//   openDialog,
//   sectionId,
//   handleClose,
//   sectionName,
// }) {
//   const [currSection, setCurrSection] = React.useState({});
//   React.useEffect(() => {});
//   const handleNameChange=(e)=>{
//     setCurrSection(e.target.value);
//     console.log(e.target.value);
//   }

//   return (
//     <Dialog
//       open={openDialog}
//       onClose={handleClose}
//       PaperProps={{
//         component: "form",
//         onSubmit: (event) => {
//           event.preventDefault();
//           const formData = new FormData(event.currentTarget);
//           const formJson = Object.fromEntries(formData.entries());
//           const email = formJson.email;
//           console.log(email);
//         },
//       }}
//     >
//       <DialogTitle>Update Section</DialogTitle>
//       <DialogContent>
//         <DialogContentText>Enter the new name of the section</DialogContentText>
//         <TextField
//           autoFocus
//           required
//           margin="dense"
//           id="name"
//           name="email"
//           label="section name"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={sectionName}
//           onChange={handleNameChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button type="submit">SUBMIT</Button>
//         {console.log(sectionId, "sectionId")}
//       </DialogActions>
//     </Dialog>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const sectionOptions = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "D1",
  "D2",
  "E1",
  "E2",
];

export default function SectionUpdateFormDialog({
  openDialog,
  sectionId,
  handleClose,
  sectionName: initialSectionName,
  setOpenDialog,
}) {
  const [sectionName, setSectionName] = React.useState(initialSectionName);

  React.useEffect(() => {
    setSectionName(initialSectionName);
  }, [initialSectionName]);

  const handleNameChange = (event) => {
    setSectionName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(false);
    console.log(sectionId, "id");
    console.log(sectionName, "edit name");
    axios
      .put("http://localhost:5000/section/updateSection", {
        id: sectionId,
        name: sectionName,
      })
      .then((res) => {
        console.log(res, "response");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Update Section</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the new name of the section</DialogContentText>
        <Select
          autoFocus
          required
          margin="dense"
          id="sectionName"
          name="sectionName"
          fullWidth
          variant="standard"
          value={sectionName}
          onChange={handleNameChange}
        >
          {sectionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
