let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
let router=express.Router();
app.use(express.static(__dirname));

// to parse the data sent by the client
router.get('/', (req,res)=>{
    res.render('register2');
    app.use(express.static(__dirname + '/'));
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
app.set('view engine','ejs');


module.exports=router;
