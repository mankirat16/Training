const express = require("express");
const {
  addAlarm,
  getAlarms,
  delAlarm,
} = require("../controllers/AlarmController");
const router = express.Router();
router.post("/add-alarm", addAlarm);
router.post("/all-alarms", getAlarms);
router.post("/del-alarm", delAlarm);
module.exports = router;
