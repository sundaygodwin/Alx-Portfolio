
const { userSchema, projectSchema, taskSchema } = require('./schema');
const ExpressError = require('./utils/ExpressError');


// VALIDATE INPUT WITH JOI
module.exports.validateProject = (req, res, next)=>{
    const { error } = projectSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }  
}
module.exports.validateTask = (req, res, next)=>{
    const { error } = taskSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }  
}

module.exports.validateUser = (req, res, next)=>{
    const { error } = userSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }  
}

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'you must be logged in');
        return res.redirect('/login')
    };
    next();
}