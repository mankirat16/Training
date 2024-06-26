const express = require("express");
const sequelize = require("./connection/connection");
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const taskRoutes = require("./routes/taskRoutes");
app.use("/task", taskRoutes);
sequelize.sync().then((res) => {
  console.log("db synced");
});

app.listen(PORT, (err) => {
  console.log(`server running on port ${PORT}`);
});
