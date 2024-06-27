const mongoose = require('mongoose');
const {Schema, model }= mongoose;
const Task = require('./tasks')

const ProjectSchema = new Schema({
    title: String,
    client: String,
    description: String,
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
})

ProjectSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await Task.deleteMany({
            _id:{
                $in: doc.tasks
            }
        })
    }
})

module.exports = model('Project', ProjectSchema);


