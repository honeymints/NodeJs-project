let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
let router=express.Router();
app.use(express.static(__dirname))

router.get('/display', (req,res)=>{

    User.find({isAdmin:false}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            res.render('display', {data:{username: docs}})
        }
    });

});

module.exports=router;