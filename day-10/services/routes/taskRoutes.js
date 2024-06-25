const router = require("express").Router();
const TaskController = require("../controllers/taskController");
router.get("/all-tasks", TaskController.getAllTasks);
router.post("/add-task", TaskController.addTask);
router.patch("/update-task", TaskController.updateTask);
router.delete('/delete-task',TaskController.deleteTask);
module.exports = router;
