let path=require('path');
const express = require('express');
const authController = require("../controller/AuthController");
const app=express();

app.use(express.static(__dirname));
let router=express.Router();
router.get('/', function(req, res) {
    let message=req.flash('message-danger');
    res.render('login',{message});
    app.use(express.static(__dirname + '/'));

});
router.post('/', authController.login);

module.exports=router;