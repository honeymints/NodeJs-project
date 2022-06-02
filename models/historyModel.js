const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const history=new Schema({
    user: {type: String},
    quantity: {type: Number },
    name: { type: String },
    added:{type:Boolean},
    time:{type:String}
})
let History=mongoose.model('History', history);
module.exports=History;