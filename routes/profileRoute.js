const express = require('express');
const router = express.Router();
const multer  = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


// support files
const ProfileControl = require('../controllers/profileControl');
const { isLoggedIn, validateUser } = require('../middlewares')
const CatchAsync = require('../utils/catchAsync')





router.route('/:id')
    .get(CatchAsync(ProfileControl.profilePage))
    .put( isLoggedIn, validateUser, upload.single('image'),  CatchAsync(ProfileControl.updateProfile));

router.get('/:id/update', isLoggedIn, CatchAsync(ProfileControl.updateProfileForm));

module.exports = router;