const mongoose = require('mongoose');


//  support files
const Project = require('../models/project');
const ProjectData = require('./data')

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
    await Project.deleteMany({});
    for(let d of data){
        const project = new Project({
            title:`${d.title}`,
            client: `${d.client}`,
            description: `${d.description}`,
            tasks: ['6670b0cba0ac772a39208e0b', '6670b0cba0ac772a39208e09', '6670b0cba0ac772a39208e0d', '6670b0cba0ac772a39208e0f' ],
        })
        await project.save()
        console.log(project)
    }
    // console.log(ProjectData[1])
}
seedDb(ProjectData)
.then(()=>{
    mongoose.connection.close();
});
