const {Schema, model } = require("mongoose")



const TaskSchema = new Schema({
    description: String,
    tools: String,
    duration: Number,
});

module.exports = model('Task', TaskSchema);