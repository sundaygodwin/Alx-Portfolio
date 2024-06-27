const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

//  support file
// const Project = require('./project')


const UserSchema = new Schema({
    email:{
        type: String, 
        required: true,
        unique: true,
    },
    image:{ url: String, filename: String },
    title: String,
    fullName: String,
    phone: String,
    website: String,
    about: String,
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
});

// UserSchema.post('findOneAndDelete', async function (doc){
//     if(doc){
//         await Project.deleteMany({
//             _id:{
//                 $in: doc.tasks
//             }
//         })
//     }
// })


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);