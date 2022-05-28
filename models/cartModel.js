const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const cart =new Schema({
    name: { type: String },
})
const Carts=mongoose.model('Cart', cart);

module.exports=Carts;