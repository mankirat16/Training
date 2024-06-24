import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const root = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h2: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={root}>
        <Container
          maxWidth="md"
          sx={{
            textAlign: "left",
            mt: 10,
            maxWidth: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to the AcademiX Student Management System
          </Typography>
          <Typography variant="h6" gutterBottom>
            Manage your students efficiently and effectively
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={() => {
                navigate("/all-users");
              }}
            >
              View Students
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ m: 1 }}
              onClick={() => {
                navigate("/add-user");
              }}
            >
              Add Student
            </Button>
          </Box>
          <Box
            component="footer"
            sx={{
              py: 3,
              textAlign: "center",
              mt: "auto",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              © 2024 AcademiX
            </Typography>
          </Box>
        </Container>
        <img src="./cover-pic.png" height="auto" width={650} />
      </Box>
    </ThemeProvider>
  );
}
