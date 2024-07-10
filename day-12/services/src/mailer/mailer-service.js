require("dotenv").config();
const { MailtrapClient } = require("mailtrap");

const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({
  endpoint: ENDPOINT,
  token: process.env.pwd,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "mankirat0816@gmail.com",
  },
];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
module.exports = client ;
