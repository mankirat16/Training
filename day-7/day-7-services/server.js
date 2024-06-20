require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const connectionString = "postgres://postgres:2916@localhost:5433/postgres";
const sequelize = new Sequelize(connectionString);
const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timeStamps: false,
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
// Country.hasOne(Capital);
// Capital.belongsTo(Country);
// Capital.hasOne(Country);
Country.hasOne(Capital, { onDelete: "CASCADE" });
Capital.hasOne(Country, { onDelete: "CASCADE" });
Country.belongsT;
let country, capital;
sequelize
  .sync({ alter: true })
  .then(() => {
    // Country.bulkCreate([
    //   {
    //     countryName: "France",
    //   },
    //   {
    //     countryName: "India",
    //   },
    //   {
    //     countryName: "Germany",
    //   },
    //   {
    //     countryName: "China",
    //   },
    // ]);
    // Capital.bulkCreate([
    //   {
    //     capitalName: "London",
    //   },
    //   {
    //     capitalName: "Madrid",
    //   },
    //   {
    //     capitalName: "Delhi",
    //   },
    //   {
    //     capitalName: "capitalx",
    //   },
    //   {
    //     capitalName: "captialy",
    //   },
    // ]);
    return Country.findOne({ where: { countryName: "France" } });
  })
  .then((data) => {
    country = data;
    return Capital.destroy({ where: { capitalName: "Madrid" } });
  })
  .then((data) => {
    console.log(data);
  })

  .catch((e) => {
    console.log(e);
  });
