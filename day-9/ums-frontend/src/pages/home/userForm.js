// // src/UserForm.js
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Typography,
// } from "@mui/material";
// const root = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   "& .MuiTextField-root": { m: 1, width: "50ch" },
//   border: "1px solid grey",
//   borderRadius:'5px',
//   padding:'50px',
//   boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
// };
// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     address: "",
//     paymentMethod: "",
//     section: "",
//     profileImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       profileImage: e.target.files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Here you can handle the form submission, e.g., send the data to a server
//   };

//   return (
//     <Box
//       component="form"
//       sx={root}
//       noValidate
//       autoComplete="off"
//       onSubmit={handleSubmit}
//     >
//       <Typography variant="h4" gutterBottom>
//         User Form
//       </Typography>
//       <TextField
//         label="ID"
//         variant="outlined"
//         name="id"
//         value={formData.id}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Name"
//         variant="outlined"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Email"
//         variant="outlined"
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Address"
//         variant="outlined"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//       />
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <InputLabel>Payment Method</InputLabel>
//         <Select
//           value={formData.paymentMethod}
//           label="Payment Method"
//           name="paymentMethod"
//           onChange={handleChange}
//         >
//           <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
//           <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
//           <MenuItem value={"PayPal"}>PayPal</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         label="Section"
//         variant="outlined"
//         name="section"
//         value={formData.section}
//         onChange={handleChange}
//       />
//       <Button variant="contained" component="label" sx={{ m: 1 }}>
//         Upload Profile Image
//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </Button>
//       <Button type="submit" variant="contained" sx={{ m: 1 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default UserForm;

// src/UserForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";

const root = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiTextField-root": { m: 1, width: "50ch" },
  borderRadius: "5px",
  padding: "50px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

const UserForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    addresses: [{ value: "" }],
    paymentMethod: "",
    section: "",
    qualifications: [{ value: "" }],
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };
  const isFormInvalid = () => {
    const basicFields = ["id", "name", "email", "paymentMethod", "section"];
    for (let field of basicFields) {
      if (!formData[field]) {
        return true;
      }
    }

    for (let address of formData.addresses) {
      if (!address.value) {
        return true;
      }
    }

    for (let qualification of formData.qualifications) {
      if (!qualification.value) {
        return true;
      }
    }

    return false;
  };

  const handleAddAddress = () => {
    if (formData.addresses.length < 3) {
      setFormData({
        ...formData,
        addresses: [...formData.addresses, { value: "" }],
      });
    }
  };

  const handleAddressChange = (e, index) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index].value = e.target.value;
    setFormData({
      ...formData,
      addresses: newAddresses,
    });
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = [...formData.addresses];
    newAddresses.splice(index, 1);
    setFormData({
      ...formData,
      addresses: newAddresses,
    });
  };

  const handleAddQualification = () => {
    if (formData.qualifications.length < 3) {
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, { value: "" }],
      });
    }
  };

  const handleQualificationChange = (e, index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index].value = e.target.value;
    setFormData({
      ...formData,
      qualifications: newQualifications,
    });
  };

  const handleRemoveQualification = (index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications.splice(index, 1);
    setFormData({
      ...formData,
      qualifications: newQualifications,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    console.log("Form submitted");
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      component="form"
      sx={root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        User Form
      </Typography>
      <TextField
        label="ID"
        variant="outlined"
        name="id"
        value={formData.id}
        onChange={handleChange}
      />
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formData.addresses.map((address, index) => (
        <div key={`address-${index}`} style={{ maxWidth: "90%" }}>
          <TextField
            style={{ maxWidth: "100%" }}
            label={`Address ${index + 1}`}
            variant="outlined"
            value={address.value}
            onChange={(e) => handleAddressChange(e, index)}
          />
          {index > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveAddress(index)}
              sx={{ ml: 1 }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      {formData.addresses.length < 3 && (
        <Button variant="contained" onClick={handleAddAddress} sx={{ mt: 1 }}>
          Add Address
        </Button>
      )}
      <FormControl sx={{ m: 1, minWidth: 430 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={formData.paymentMethod}
          label="Payment Method"
          name="paymentMethod"
          onChange={handleChange}
        >
          <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
          <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
          <MenuItem value={"PayPal"}>PayPal</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Section"
        variant="outlined"
        name="section"
        value={formData.section}
        onChange={handleChange}
      />
      {formData.qualifications.map((qualification, index) => (
        <div key={`qualification-${index}`}>
          <TextField
            label={`Qualification ${index + 1}`}
            variant="outlined"
            value={qualification.value}
            onChange={(e) => handleQualificationChange(e, index)}
          />
          {index > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveQualification(index)}
              sx={{ ml: 1 }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      {formData.qualifications.length < 3 && (
        <Button
          variant="contained"
          onClick={handleAddQualification}
          sx={{ mt: 1 }}
        >
          Add Qualification
        </Button>
      )}
      <Box display={"flex"} marginTop={5}>
        <Button variant="outlined" component="label" sx={{ m: 1 }}>
          Upload Profile Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        <Button type="submit" variant="contained" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
