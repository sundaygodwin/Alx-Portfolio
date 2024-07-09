const User = require('../models/user');
//  REGISTER
module.exports.registerForm = (req, res)=>{
    res.render('user/register')
};
module.exports.registerUser = async (req, res)=>{
    try{
        const {username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, async ( err ) =>{
            const userProfile = await User.findById(req.user._id);
            if(err) return next(err);
            req.flash('success',"Registration successful")
            res.redirect(`/myprofile/${userProfile._id}`);
        })
    }catch(e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
};
// LOGIN
module.exports.loginForm = (req, res)=>{
    res.render('user/login')
};
module.exports.loginUser = async (req, res)=>{
    const userProfile = await User.findById(req.user._id);
    req.flash('success', `Welcome, ${req.user.username}`);
    res.redirect(`/myprofile/${userProfile._id}`);
};
//  LOGOUT
module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
};