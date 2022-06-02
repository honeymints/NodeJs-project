const mongoose=require('mongoose');

const cart =new mongoose.Schema({
    user: {
        type: String,
    },
    quantity: { type: Number },
    name: { type: String },
})
const Carts=mongoose.model('Cart', cart);

module.exports=Carts;