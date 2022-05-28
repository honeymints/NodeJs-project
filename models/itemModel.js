const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const item=new Schema({
    name: { type: String },
    image: { type: String }
})

const Item=mongoose.model('Item', item);
module.exports=Item;