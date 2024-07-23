// scheduler.js
const cron = require("node-cron");
const Alarm = require("../models/AlarmModel"); // Adjust the path according to your setup
const moment = require("moment");
const { Op } = require("sequelize"); // Import Op for Sequelize operators
const mailer = require("../mailer/mailer-service");

// Schedule the cron job to run every minute
const scheduler = (io) => {
  console.log("Scheduler running");
  cron.schedule("* * * * *", async () => {
    try {
      const utc = moment();
      const now = moment(utc).tz("Asia/Kolkata").format(); // Current time in ISO format
      console.log(now, "NOW");
      const alarms = await Alarm.findAll({
        where: {
          dateTime: {
            [Op.eq]: now,
          },
        },
      });

      alarms.forEach(async (alarm) => {
        console.log("Alarm ringing:", alarm.text);
        mailer
          .sendMail({
            from: '"Mankirat saini 👻" <mailtrap@demomailtrap.com>',
            to: "mankirat0816@gmail.com",
            subject: "Alarm triggered",
            text: "Alarm triggered",
            html: "An alarm has been triggered",
          })
          .then((res) => {
            console.log(res);
          });
        io.emit("alarmTriggered", {
          text: alarm.text,
          dateTime: alarm.dateTime,
          userId: alarm.userId,
        });
      });
      for (const alarm of alarms) {
        console.log("Alarm Destroying:", alarm.text);
        await alarm.destroy();
      }
    } catch (error) {
      console.error("Error checking alarms:", error);
    }
  });
};
module.exports = scheduler;
