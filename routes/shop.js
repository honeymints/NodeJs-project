let path=require('path');
const express=require('express');
const app=express();
let router=express.Router();
let item=require('../models/itemModel')
const {requireAuth} =require('../middleware/authMiddleware');

router.get('/', requireAuth, function(request, response, next){
    item.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('ShopProduct', {data:{name: docs}})
        }
    });
})


module.exports=router;