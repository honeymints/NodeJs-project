const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require("express");

const app=express();

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
            isAdmin:false,
        },)


        if (req.body.name == '' || req.body.email == '' || req.body.password=='' || req.body.city=='' || req.body.age=='') {

            req.flash('message-danger', "Fill all information");

            res.redirect('register');

            console.log('an error have occurred')
        }

        else {
            user.save()
                .then(user => {
                    app.use(express.static(__dirname + '/'));
                    res.redirect('home');
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
                            console.log('login success')
                            let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
                            if(!user.isAdmin) {
                                //req.flash('message-danger', "Login success!");
                                app.use(express.static(__dirname + '/'));
                                res.redirect('home');
                                console.log(token);
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
module.exports={
    register,login
}