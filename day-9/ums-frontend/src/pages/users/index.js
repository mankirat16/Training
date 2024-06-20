import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";

export default function Users() {
  const [users, setUsers] = useState([
    {
      name: "Mankirat",
      email: "email@jjsdsdasdasd",
    },
    {
      name: "Mankirat",
      email: "email@asasasdasda",
    },
    {
      name: "Mankirat",
      email: "email@asasdasdasdasd",
    },
    {
      name: "Mankirat",
      email: "email@asdasdas",
    },
  ]);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 5 }}
      marginTop={3}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button startIcon={<Visibility />} variant="outlined">
              View Profile
            </Button>
            <Button startIcon={<Edit />} variant="outlined" color="primary">
              Edit Profile
            </Button>
            <Button startIcon={<Delete />} variant="outlined" color="error">
              Delete User
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
