const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const chat = new Schema( {
    name: { type: String },
    message: { type: String }
});
const Chat=mongoose.model('Chat', chat);
module.exports=Chat;