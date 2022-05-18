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
    isAdmin: Boolean

}, {timestamps:true})

const User=mongoose.model('user', user);
module.exports=User;