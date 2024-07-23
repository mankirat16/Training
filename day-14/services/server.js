const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const User = require("./src/models/UserModel");
const Alarm = require("./src/models/AlarmModel");
const sequelize = require("./src/connection/connection");
const userRouter = require("./src/routes/UserRoutes");
const alarmRouter = require("./src/routes/AlarmRoutes");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
const scheduler = require("./src/controllers/scheduler");
scheduler(io);
app.use(express.urlencoded());
app.use(express.json());
app.use("/user", userRouter);
app.use("/alarm", alarmRouter);
User.hasMany(Alarm, {
  foreignKey: "userId",
});
Alarm.belongsTo(User, {
  foreignKey: "userId",
});
sequelize.sync().then((res) => {
  console.log("database synced");

  // addAlarm();
});
app.get("/", (req, res) => {
  res.send("Server is running");
});

server.listen(5000, (err) => {
  if (!err) {
    console.log("Server is running on port 5000");
  }
});
