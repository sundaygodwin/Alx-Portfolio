const mongoose = require('mongoose');


//  support files
const User = require('../models/user')

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


const seedDb = async ()=>{
    // await User.deleteMany({});
        const user = new User({
            email:"sgift@gmail.com",
            image: "",
            title: "Dr.",
            fullName: "Sunday Godwin",
            phone: '08161642661',
            website: 'www.web.com',
            about: 'Alx Project underway',
            projects: ['6671fcd79892b2b26284482a', '6674a6f626cdf1816daf56b5', '6670b14664943afe9db036ce'],
        })
        await user.save()
        console.log(user)
    
}
seedDb()
.then(()=>{
    mongoose.connection.close();
});
