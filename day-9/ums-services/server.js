const sequelize = require("./connection/db");
const User = require("./models/User");
const Qualification = require("./models/Qualification");
const Section = require("./models/Sections");
const UserQualification = require("./models/UserQualification");
User.belongsTo(Section);
Section.hasMany(User);
User.belongsToMany(Qualification, { through: UserQualification });
Qualification.belongsToMany(User, { through: UserQualification });
sequelize
  .sync()
  .then(() => {
    console.log("PostgreSQL database synced");
  })
  .catch((err) => {
    console.error("Error syncing PostgreSQL database:", err);
  });
