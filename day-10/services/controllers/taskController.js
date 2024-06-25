const task = require("../models/TaskModel");
const getAllTasks = async (req, res, next) => {
  try {
    const data = await task.findAll();
    res.json({ ...data });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
};
const addTask = async (req, res, next) => {
  console.log("add");
  if (req.body.name) {
    const newTask = {
      name: req.body.name,
    };
    try {
      const res = await task.create(newTask);
      res.sendStatus(200);
    } catch (e) {
      res.status(404).json({ data: e });
    }
  } else {
    res.status(404).json({ message: "Empty task name" });
  }
};
const updateTask = async (req, res, next) => {
  if (req.body.id) {
    if (req.body.name) {
      try {
        const result = await task.update(
          {
            name: req.body.name,
          },
          { where: { id: req.body.id } }
        );
        res.sendStatus(200);
      } catch (e) {
        console.log(e);
        res.sendStatus(404);
      }
    }
  } else {
    res.sendStatus(404);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const result = await task.destroy({ where: { id: req.body.id } });
    res.json({ message: "task deleted" });
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};
module.exports = { getAllTasks, addTask, updateTask, deleteTask };
