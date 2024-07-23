const express = require("express");
const {
  addAlarm,
  getAlarms,
  delAlarm,
  editAlarm,
} = require("../controllers/AlarmController");
const router = express.Router();
router.post("/add-alarm", addAlarm);
router.post("/all-alarms", getAlarms);
router.post("/del-alarm", delAlarm);
router.post("/edit-alarm", editAlarm);
module.exports = router;
