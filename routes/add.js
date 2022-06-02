let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
const bcrypt = require("bcryptjs");
let router=express.Router();
app.use(express.static(__dirname));

router
    .get('/add', function(req, res, next){
    let message=req.flash('message-danger');
    res.render('add',{message});
    app.use(express.static(__dirname + '/'));
})
.post('/add', function(req, res, next){
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }
         User.insertMany({username: req.body.username, age: req.body.age, city: req.body.city, email: req.body.email, password: hashedPass, isAdmin:false}, (function(err,docs) {
             if (err) {
                 console.log(err);
             }
             if(req.body.name=='' || req.body.email=='' || req.body.password=='' || req.body.city=='' || req.body.age==''){
                 req.flash('message-danger', "Fill all information");
                 res.redirect('add')
             }
             User.find({}, function (err, docs) {
                 if (err) {
                     console.log(err);

                 } else {
                     res.render('register2', {data: {username: docs}})
                 }
             })

        }))

    })
})

module.exports=router;