const task = require("../models/TaskModel");
const getAllTasks = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;
  const sorting = req.query.sort || "ASC";

  try {
    const data = await task.findAll({
      limit: limit,
      offset: offset,
      order: [["priority", sorting]],
    });
    const totalTasks = await task.count();
    res.json({ tasks: data, totalTasks: totalTasks });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Error fetching tasks" });
  }
};

const addTask = async (req, res, next) => {
  if (req.body.name) {
    const newTask = {
      name: req.body.name,
      priority: req.body.priority,
    };
    try {
      const result = await task.create(newTask);
      res.sendStatus(200);
    } catch (e) {
      res.status(404).json({ data: e });
    }
  } else {
    res.status(404).json({ message: "Empty task name" });
  }
};

const updateTask = async (req, res, next) => {
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
