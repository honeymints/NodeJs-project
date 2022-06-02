const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const user= new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    city: {
        type: String},
    age: {
        type: Number },
    role:{
        type:String
    },
}, {timestamps:true})

const User=mongoose.model('User', user);
module.exports=User;