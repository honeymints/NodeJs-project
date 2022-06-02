const mongoose=require('mongoose')
const Schema=mongoose.Schema;
 const add = new Schema({
    product: { type: String },
    cost: { type: Number },
    image: { type: String }
});
 const Add=mongoose.model('newprod', add);
 module.exports=Add;