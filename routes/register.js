let path=require('path');
const express = require('express');
const authController=require('../controller/AuthController');
let router=express.Router();
const  app = express();

router.get('/', function(req, res){
    let message=req.flash('message-danger');
    res.render('register',{message});
    app.use(express.static(__dirname + '/'));

})
router.post('/', authController.register)


module.exports=router;