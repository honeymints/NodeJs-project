let path=require('path');
const express=require('express');
const User=require('../models/User');
let router=express.Router();
const {authRole}=require('../controller/AuthController');
let add=require('../models/add');


// to parse the data sent by the client
router.get('/', (req,res)=>{
    res.render('register2');
})

router.post('/', (req,res)=>{
    const obj = JSON.parse(JSON.stringify(req.body));
    User.find({}, function (err, docs) {
       if (err){
            console.log(err);
        }
      else{
            res.render('register2', {data:{name: docs}})
      }
    });

});
router
    .route('/adminchat')
.get (function(request, response, next){
    let chat=require('../models/chatModel');
    chat.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('adminchat', {data:{name: docs}})
        }
    });
})
    .post(function(request, response, next){
        let chat=require('../models/chatModel');
        chat.insertMany({ name: request.body.name, message: request.body.message}, function(err,docs) {
            if (err) throw err;
            chat.find({}, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                    response.render('adminchat', {data:{name: docs}})
                }
            });
        });
    });
router
    .route('/deletechat')
.post(function(request, response, next){
    let chat=require('../models/chatModel');
    chat.deleteOne({ message: request.body.message}, function(err,docs) {
        if (err) throw err;
        chat.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('adminchat', {data:{name: docs}})
            }
        });
    });
});

router
    .route('/addprod')
    .get(function(request, response, next){
        response.render('addprod');
    })
    .post( function(request, response, next){
    add.insertMany({ product: request.body.product, cost: request.body.cost, image: request.body.image}, function(err,docs) {
        if (err) throw err;
        add.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('addprod', {data:{name: docs}})
            }
        });
    });
});



module.exports=router;
