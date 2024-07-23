const sequelize = require("../connection/connection");
const Alarm = require("../models/AlarmModel");
const addAlarm1 = require("./scheduler");
const moment = require("moment-timezone");

const addAlarm = async (req, res, next) => {
  try {
    const alarm = {
      text: req.body.text,
      dateTime: req.body.dateTime,
      userId: req.body.userId,
    };
    const result = await Alarm.create(alarm);
    // addAlarm1();
    res.status(200).json({
      message: "Alarm created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json("Internal server error");
  }
};
const getAlarms = async (req, res, next) => {
  try {
    const data = await Alarm.findAll({
      where: {
        userId: req.body.userId,
      },
    });
    res.status(200).json([...data]);
  } catch (e) {
    console.log(e);
    res.status(404).json("Error while fetching alarms");
  }
};
const delAlarm = async (req, res, next) => {
  try {
    await Alarm.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ message: "Alarm deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(404).json("Internal server error");
  }
};
module.exports = { addAlarm, getAlarms, delAlarm };
