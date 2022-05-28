const express=require('express');
const router=express.Router();
const authController=require("../controller/AuthController");


router.get('/', authController.logout_get)
module.exports=router;