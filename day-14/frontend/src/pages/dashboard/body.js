// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Box,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// const Body = () => {
//   const [alarms, setAlarms] = useState([]);
//   const [alarmText, setAlarmText] = useState("");
//   const [alarmDateTime, setAlarmDateTime] = useState("");

//   useEffect(() => {
//     fetchAlarms();
//   }, []);

//   const fetchAlarms = async () => {
//     axios
//       .post("http://localhost:5000/alarm/all-alarms", {
//         userId: 1,
//       })
//       .then((res) => {
//         console.log(res);
//         setAlarms(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const addAlarm = async () => {
//     try {
//       const newAlarm = {
//         text: alarmText,
//         dateTime: alarmDateTime,
//       };
//       console.log(JSON.stringify(newAlarm));
//       axios
//         .post("http://localhost:5000/alarm/add-alarm", {
//           text: alarmText,
//           dateTime: newAlarm.dateTime,
//           userId: 1,
//         })
//         .then((res) => {
//           console.log(res);
//           fetchAlarms();
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//       fetchAlarms();
//       setAlarmText("");
//       setAlarmDateTime("");
//     } catch (error) {
//       console.error("Error adding alarm:", error);
//     }
//   };
//   const deleteAlarm = () => {
//     console.log("delete alarm");
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Alarm Dashboard
//       </Typography>
//       <Box my={4}>
//         <Grid container spacing={3} justify="center">
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Alarm Text"
//               value={alarmText}
//               onChange={(e) => setAlarmText(e.target.value)}
//               variant="outlined"
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="datetime-local"
//               label="Date & Time"
//               value={alarmDateTime}
//               onChange={(e) => setAlarmDateTime(e.target.value)}
//               variant="outlined"
//               margin="normal"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} align="center">
//             <Button variant="contained" color="primary" onClick={addAlarm}>
//               Add Alarm
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box my={4}>
//         <Typography variant="h6" gutterBottom>
//           Current Alarms
//         </Typography>
//         <List>
//           {alarms.map((alarm) => (
//             <ListItem
//               key={alarm.id}
//               secondaryAction={
//                 <>
//                   <IconButton
//                     edge="end"
//                     aria-label="edit"
//                     // onClick={() => openEditDialog(alarm)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     // onClick={() => deleteAlarm(alarm.id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               }
//             >
//               <ListItemText
//                 primary={alarm.text}
//                 secondary={new Date(alarm.dateTime).toLocaleString()}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default Body;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { UpdateContext } from "../../context";
import FormDialog from "./editAlarmDialog";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
const Body = () => {
  const [alarms, setAlarms] = useState([]);
  const [alarmText, setAlarmText] = useState("");
  const [alarmDateTime, setAlarmDateTime] = useState("");
  const { setIsLoggedIn, setUserId } = useContext(UpdateContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAlarms();
    socket.on("alarmTriggered", (data) => {
      console.log("Received socket event:", data);
      toast.success("Alarm triggered " + data.text);
    });
    return () => {
      socket.off("alarmTriggered");
    };
  }, []);

  const fetchAlarms = async () => {
    axios
      .post("http://localhost:5000/alarm/all-alarms", {
        userId: 1,
      })
      .then((res) => {
        console.log(res);
        setAlarms(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addAlarm = async () => {
    if (!alarmText || !alarmDateTime) {
      toast.error("Please fill in both fields.");
      return;
    }
    try {
      const newAlarm = {
        text: alarmText,
        dateTime: alarmDateTime,
      };
      console.log(JSON.stringify(newAlarm));
      axios
        .post("http://localhost:5000/alarm/add-alarm", {
          text: alarmText,
          dateTime: newAlarm.dateTime,
          userId: 1,
        })
        .then((res) => {
          console.log(res);
          fetchAlarms();
          toast.success("Alarm added successfully!"); // Show success notification
        })
        .catch((e) => {
          console.log(e);
        });
      setAlarmText("");
      setAlarmDateTime("");
    } catch (error) {
      console.error("Error adding alarm:", error);
      toast.error("Error adding alarm. Please try again."); // Show error notification
    }
  };
  const logout = () => {
    console.log("log out");
    setUserId(null);
    setIsLoggedIn(false);
    navigate("/login");
  };
  const deleteAlarm = (id) => {
    console.log("delete alarm", id);
    axios
      .post("http://localhost:5000/alarm/del-alarm", {
        id: id, // Ensure the key matches the server-side expectation
      })
      .then((res) => {
        console.log(res);
        fetchAlarms(); // Refresh the list of alarms
        toast.success("Alarm deleted successfully!"); // Show success notification
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error deleting alarm. Please try again."); // Show error notification
      });
  };
  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" mb={2} mt={4}>
        <FormDialog/>
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Alarm Dashboard
      </Typography>
      <Box my={4}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alarm Text"
              value={alarmText}
              onChange={(e) => setAlarmText(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="datetime-local"
              label="Date & Time"
              value={alarmDateTime}
              onChange={(e) => setAlarmDateTime(e.target.value)}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={addAlarm}>
              Add Alarm
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Current Alarms
        </Typography>
        <List>
          {alarms.map((alarm) => (
            <ListItem
              key={alarm.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    // onClick={() => openEditDialog(alarm)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteAlarm(alarm.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={alarm.text}
                secondary={new Date(alarm.dateTime).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Body;
