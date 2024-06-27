const Joi = require("joi");


module.exports.projectSchema = Joi.object({
    project: Joi.object({
        title: Joi.string().required(),
        client: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});

module.exports.taskSchema = Joi.object({
    task: Joi.object({
        description: Joi.string().required(),
        tools: Joi.string().required(),
        duration: Joi.number().required(),
    }).required(),
});

module.exports.userSchema = Joi.object({
    user: Joi.object({
        title: Joi.string().required(),
        fullName: Joi.string().required(),
        phone: Joi.string().required(),
        about: Joi.string().required(),
        website: Joi.string(),
    }).required,
})