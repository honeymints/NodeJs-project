const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require("express");

const app=express();

const maxAge = 3 * 24 * 60 * 60;
const createToken=(id)=>{
    return jwt.sign({id}, 'secret token',
        {expiresIn:maxAge})
};

const register=(req, res, next) => {

    bcrypt.hash(req.body.psw, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            username: req.body.name,
            email: req.body.email,
            password: hashedPass,
            city:req.body.city,
            age:req.body.age,
            isAdmin:false, //123456
        },)
        const token=createToken(user._id);
        res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000});


        if (req.body.name == '' || req.body.email == '' || req.body.password=='' || req.body.city=='' || req.body.age=='') {

            req.flash('message-danger', "Fill all information");

            res.redirect('register');

            console.log('an error have occurred')
        }

        else {
            user.save()
                .then(user => {
                    app.use(express.static(__dirname + '/'));
                    res.redirect('/home');
                })
                .catch(user=>{
                    req.flash('message-danger', "Email is already used")
                    res.redirect('register');
                })
        }


    })
}
const login =(req,res,next)=> {
    let username = req.body.email;
    let password = req.body.psw;
    if ( username == '' || req.body.password=='') {

        req.flash('message-danger', "Fill in all information")
            res.redirect('login');


        console.log('an error have occurred')
    }
    else {

        User.findOne({email:username})
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            console.log('an error')
                        }
                        if (result)
                        {
                            const token=createToken(user._id);
                            res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000});
                            console.log('login success')
                            if(!user.isAdmin) {

                                app.use(express.static(__dirname + '/'));
                                res.redirect('/shop');

                            }
                            else{
                                res.redirect('admin')
                            }

                        }
                        else
                        {
                            req.flash('message-danger', "Password does not match!")
                                res.redirect('login');

                        }
                    })
                }
                else {
                    req.flash('message-danger', "No user found")
                        res.redirect('login');

                }
            })

    }
}

const logout_get=(req,res)=>{
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/home')
}
module.exports={
    register,login,logout_get
}