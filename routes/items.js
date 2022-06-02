let path=require('path');
const express = require('express');
let router=express.Router();
const Item=require('../models/itemModel');

router.post('/items', (req, res) => {

    Item.findOne({name: req.body.name}, function (err, docss) {
        if (err){
            console.log(err)
        }
        else{
            res.render('cart', { docss})
        }
    })
});
module.exports=router;