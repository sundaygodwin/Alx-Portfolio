const mongoose = require('mongoose');


//  support files
const Task = require('../models/tasks');
const TaskData = require('./taskData')

//  Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/alx-portfolio';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", ()=>{
    console.log('Database connected')
});


const seedDb = async (data)=>{
    await Task.deleteMany({});
    for(let d of data){
        const task = new Task({
            tools:`${d.tools}`,
            duration: `${d.duration}`,
            description: `${d.description}`,
        })
        await task.save()
        console.log(task);
    }
    // console.log(ProjectData[1])
}
seedDb(TaskData)
.then(()=>{
    mongoose.connection.close();
});
