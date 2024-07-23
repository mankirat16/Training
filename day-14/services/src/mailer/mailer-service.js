require("dotenv").config();
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "36c77eefd419bcbb867090e8b0da2e06",
  },
});
module.exports = transport;
