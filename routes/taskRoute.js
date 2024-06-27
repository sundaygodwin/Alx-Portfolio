const express = require('express');
const router = express.Router();

const CatchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateTask } = require('../middlewares')
const TaskControl = require('../controllers/taskControl')

// add task
router.get("/:id/project/:pid/addtask", isLoggedIn, CatchAsync(TaskControl.addTaskForm));
router.post("/:id/project/:pid", isLoggedIn, validateTask, CatchAsync(TaskControl.addTask));
// edit task
router.get('/:id/project/:pid/tasks/:tid/edit', isLoggedIn, CatchAsync(TaskControl.editTaskForm));
router.route("/:id/project/:pid/tasks/:tid")
    .put(isLoggedIn, validateTask, CatchAsync(TaskControl.updateTask))
    // delete task
    .delete(isLoggedIn, CatchAsync(TaskControl.removeTask));

module.exports = router;