const User = require("../models/UserModel");
const Section = require("../models/SectionModel");
const Qualification = require("../models/QualificationsModel");

const getSections = async (req, res, next) => {
  const result = await Section.findAll();
  res.json({ data: result });
};

const addSection = async (req, res, next) => {
  try {
    const result = await Section.create({ name: req.body.name });
    res.json({ data: "test" });
  } catch (e) {
    console.log("error " + e);
    res.sendStatus(500);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const result = await Section.destroy({ where: { id: req.body.id } });
    res.json({ data: result });
  } catch (e) {
    console.log("error " + e);
    res.sendStatus(500);
  }
};

const viewSectionUsers = async (req, res, next) => {
  console.log(req.body.id);
  try {
    const result = await Section.findOne({ where: { id: req.body.id } });
    const users = await result.getUsers();
    res.json({ data: users });
  } catch (e) {
    console.log("eror " + e);
    res.sendStatus(500);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const result = await Section.update(
      { name: req.body.name },
      { where: { id: req.body.id } }
    );
    res.json({ data: result });
  } catch (e) {
    console.log("Error while updating section");
    res.sendStatus(500);
  }
};

module.exports = {
  getSections,
  addSection,
  deleteSection,
  viewSectionUsers,
  updateSection,
};
