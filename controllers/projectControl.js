const Project = require('../models/project');
const User = require('../models/user');


// Create Project 
module.exports.addProjectForm = async (req, res)=>{
    const userProfile = await User.findById(req.params.id);
    res.render('project/new', { userProfile });
};
module.exports.addProject = async(req, res)=>{
    const userProfile = await User.findById(req.params.id);
    const project = new Project(req.body.project);
    userProfile.projects.push(project);
    await project.save();
    await userProfile.save();
    req.flash('success', 'Project uploaded successfully');
    res.redirect(`/myprofile/${userProfile._id}`);
};
//  project page
module.exports.showProject = async(req, res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id)
    .populate({
        path: 'projects',
    });
    const project = await Project.findById(pid)
    .populate({
        path : 'tasks',
    });
    res.render("project/show", { project, userProfile });
};
// edit project
module.exports.editProjectForm = async (req, res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findById(pid);
    res.render('project/edit', { project, userProfile });
};
module.exports.updateProject = async (req,res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findByIdAndUpdate(pid, {...req.body.project});
    await project.save();
    req.flash('success', `${project.title} updated successfully`);
    res.redirect(`/myprofile/${userProfile._id}/project/${project._id}`);
};
// delete
module.exports.removeProject = async (req, res)=>{
    const {id, pid} = req.params;
    const userProfile = await User.findById(id);
    const project = await Project.findByIdAndDelete(pid);
    req.flash('success', `${project.title} deleted successfully`);
    res.redirect(`/myprofile/${userProfile._id}`);
};