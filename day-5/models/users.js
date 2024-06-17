const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  pwd: {  
    type: String,
  },
});
const userModel = mongoose.model("users" , userSchema);
module.exports = userModel;