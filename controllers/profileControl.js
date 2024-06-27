const User = require('../models/user');



module.exports.profilePage = async (req, res)=>{
    const userProfile = await User.findById(req.params.id)
    .populate({
        path: 'projects',
    })
    res.render("project/myprofile", { userProfile });
};

//update profile
module.exports.updateProfileForm = async (req, res)=>{
    const userProfile = await User.findById(req.params.id);
    res.render('user/userUpdate' , { userProfile })
};
module.exports.updateProfile =  async (req, res)=>{
    const file = req.file;
    const user = await User.findById(req.params.id);
    const userProfile = await User.findByIdAndUpdate(req.params.id, {...req.body.user});
    if(!file){
        userProfile.image = user.image 
    }else{
        userProfile.image = {url: file.path, filename:file.filename}
    };
    await userProfile.save();
    req.flash('success', 'Profile updated successfully');
    res.redirect(`/myprofile/${userProfile._id}`);
};