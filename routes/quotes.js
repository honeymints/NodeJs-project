let path=require('path');
const express = require('express');
let router=express.Router();
router.get('/', function(req, res){
    res.render('s')
})
module.exports=router;