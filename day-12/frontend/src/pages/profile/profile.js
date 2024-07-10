import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PaidIcon from "@mui/icons-material/Paid";
import axios from "axios";
import { UpdateContext } from "../../adminContext";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { cartId } = useContext(UpdateContext);

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/view-user", { id: cartId })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [cartId]);

  if (!userData) {
    return (
      <Container component="main" maxWidth="sm">
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
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 80, height: 80 }}>
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          User Profile
        </Typography>
        <List sx={{ width: "100%", mb: 2 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {userData.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Name: ${userData.name}`} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <EmailIcon />
            </ListItemAvatar>
            <ListItemText primary={`Email: ${userData.email}`} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <LockIcon />
            </ListItemAvatar>
            <ListItemText primary={`Role: ${userData.role}`} />
          </ListItem>
          {userData.paymentMethods && (
            <ListItem>
              <ListItemAvatar>
                <PaidIcon />
              </ListItemAvatar>
              <ListItemText
                primary={`Payment Methods: ${userData.paymentMethods}`}
              />
            </ListItem>
          )}
        </List>
        <Box sx={{ mt: 2 }}>
          <Divider />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            <a href="/update-profile" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Update Profile
              </Button>
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
