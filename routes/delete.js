let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
let router=express.Router();
app.use(express.static(__dirname));

router.get('/delete', (req,res)=>{
    User.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            res.render('delete', {data:{username: docs}})
        }
    });

})
.post('/delete', function(request, response, next){

    User.deleteMany({ email: request.body.email}, function(err,docs) {
        if (err) throw err;
        User.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('register2', {data:{username: docs}})
            }
        });

    });

})

module.exports=router;