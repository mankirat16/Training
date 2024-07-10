// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UpdateContext } from "../../adminContext";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Avatar,
//   CssBaseline,
//   IconButton,
//   InputAdornment,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Login() {
//   const { setIsLoggedIn, setCartId, isLoggedIn } = useContext(UpdateContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState("buyer");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn) navigate("/");
//   }, [isLoggedIn, navigate]);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/user/login", {
//         name: email,
//         pwd: password,
//         role: role,
//       })
//       .then((res) => {
//         console.log(res);
//         setIsLoggedIn(true);
//         setCartId(res.data.cartId);
//         role === "admin" ? navigate("/admin-panel") : navigate("/");
//       })
//       .catch((e) => {
//         console.log(e);
//         toast.error("Invalid username or password", {
//           progressStyle: { backgroundColor: "red" },
//         });
//       });
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <ToastContainer />
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backgroundColor: "#ffffff",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <FormControl component="fieldset" sx={{ mt: 2 }}>
//             <FormLabel component="legend">Role</FormLabel>
//             <RadioGroup
//               row
//               aria-label="role"
//               name="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <FormControlLabel
//                 value="seller"
//                 control={<Radio />}
//                 label="Seller"
//               />
//               <FormControlLabel
//                 value="buyer"
//                 control={<Radio />}
//                 label="Buyer"
//               />
//               <FormControlLabel
//                 value="support"
//                 control={<Radio />}
//                 label="Support"
//               />
//               <FormControlLabel
//                 value="admin"
//                 control={<Radio />}
//                 label="Admin"
//               />
//             </RadioGroup>
//           </FormControl>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Log In
//           </Button>
//           <Typography variant="body2">
//             New user? <Link to="/signup">Sign up here</Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UpdateContext } from "../../adminContext";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setIsLoggedIn, setCartId, isLoggedIn } = useContext(UpdateContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        name: email,
        pwd: password,
        role: role,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setCartId(res.data.cartId);
        role === "admin" ? navigate("/admin-panel") : navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Invalid username or password", {
          progressStyle: { backgroundColor: "red" },
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="seller"
                control={<Radio />}
                label="Seller"
              />
              <FormControlLabel
                value="buyer"
                control={<Radio />}
                label="Buyer"
              />
              <FormControlLabel
                value="support"
                control={<Radio />}
                label="Support"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2">
            New user? <Link to="/signup">Sign up here</Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Link to="/reset-password">Forgot Password?</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
