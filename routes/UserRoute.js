const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local');


//support files
const CatchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const UserControl = require('../controllers/userControl')
const { isLoggedIn } = require('../middlewares')

router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route('/register')
    .get(UserControl.registerForm)
    .post(CatchAsync(UserControl.registerUser));

router.route('/login')
    .get(UserControl.loginForm)
    .post(
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
        UserControl.loginUser
    );

//logout
router.get('/logout', isLoggedIn, UserControl.logoutUser);

module.exports = router;