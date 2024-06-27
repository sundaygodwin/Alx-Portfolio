const Project = require('../models/project');
const Task = require('../models/tasks');
const User = require('../models/user'); 



// add task
module.exports.addTaskForm = async (req,res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    res.render("task/addtask", { project, userProfile })
};
module.exports.addTask = async (req, res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    const task = new Task(req.body.task);
    project.tasks.push(task);
    await task.save();
    await project.save();
    req.flash('success', 'Task uploaded successfully');
    res.redirect(`/myprofile/${userProfile._id}/project/${project._id}`);
};
// edit task
module.exports.editTaskForm = async (req, res)=>{
    const {id, pid, tid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    const task = await Task.findById(tid);
    res.render('task/editTask', { userProfile, project, task });
};
module.exports.updateTask = async (req, res)=>{
    const {id, pid, tid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    const task = await Task.findByIdAndUpdate(tid, {...req.body.task});
    await task.save();
    req.flash('success', 'Task updated successfully');
    res.redirect(`/myprofile/${userProfile._id}/project/${project._id}`);
};

// delete task
module.exports.removeTask = async (req, res)=>{
    const {id, pid, tid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    const task = await Task.findByIdAndDelete(tid);
    req.flash('success', 'Task deleted successfully');
    res.redirect(`/myprofile/${userProfile._id}/project/${project._id}`);
};