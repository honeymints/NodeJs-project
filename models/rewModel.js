const mongoose=require('mongoose');
const rew = new mongoose.Schema( {
    name: { type: String },
    product: { type: String },
    grade: { type: Number },
    feedback: { type: String }
});
const Review=mongoose.model('Review', rew);
module.exports=Review;