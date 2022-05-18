let path=require('path');
const express=require('express');
const app=express();
const User=require('../models/User');
let router=express.Router();
app.use(express.static(__dirname));

router.post('/', function(request, response, next){


    let mycity = {city: 1};

    User.find({}, function (err, result) {

        if (err) {
            console.log("error query");
        } else {
            response.render('sortedcity',{result});
        }

    }).sort(mycity);

})

module.exports=router;