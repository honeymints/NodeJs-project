let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
let router=express.Router();
app.use(express.static(__dirname));

router.get('/edit', function(req, res, next){
    res.render('tipoedit')
})
.post('/edit', function(req, res, next){
    User.deleteMany({ username: req.body.oldUsername}, function(err,docs) {
        if (err) throw err;
        User.insertMany({ username: req.body.name,  age: req.body.age, city: req.body.city,email:req.body.email, password:req.body.password, isAdmin:false}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                res.render('register2', {data:{username: docs}})
            }
        });
    });
})


module.exports=router;