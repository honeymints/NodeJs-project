let path=require('path');
const express = require('express');
let router=express.Router();
const authController=require('../controller/AuthController')
router.get('/',  function(req, res) {
    res.render('home')

});

module.exports=router;