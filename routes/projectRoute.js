const express = require('express');
const router = express.Router();

// support files
const ProjectControl = require('../controllers/projectControl');
const CatchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateProject } = require('../middlewares');


// Create Project 
router.get('/:id/addProject', isLoggedIn, CatchAsync(ProjectControl.addProjectForm));
router.post('/:id', isLoggedIn, validateProject, CatchAsync(ProjectControl.addProject));

router.get('/:id/project/:pid/edit', isLoggedIn, CatchAsync(ProjectControl.editProjectForm));

router.route('/:id/project/:pid')
    .get(isLoggedIn, CatchAsync(ProjectControl.showProject))// project page
    .put(isLoggedIn, validateProject, CatchAsync(ProjectControl.updateProject))
    .delete(isLoggedIn, CatchAsync(ProjectControl.removeProject));

module.exports = router;