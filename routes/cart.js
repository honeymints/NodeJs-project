let path=require('path');
const express=require('express');
let router=express.Router();
let cart=require('../models/cartModel')

router.get('/', function(request, response, next){
    cart.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('cartView', {data:{name: docs}})
        }
    });
});
router.post('/', function(request, response, next){
    cart.insertMany({ name: request.body.name}, function(err,docs) {
        if (err) throw err;
        cart.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('cartView', {data:{name: docs}})
            }
        });
    });

});
module.exports=router;