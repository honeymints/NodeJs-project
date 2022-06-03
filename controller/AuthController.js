const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require("express");
const cookieParser=require('cookie-parser')
const app=express();
const role_user="user";
const role_admin="admin";

app.use(cookieParser());

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
            role:role_user //123456
        },)
        const token=createToken(user._id);
        res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000});
        res.cookie('email', req.body.email,{httpOnly:true, maxAge:maxAge*1000});

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
                    res.redirect('/register');
                })
        }
    })
}
const login =(req,res,next)=> {
    let username = req.body.email;
    let password = req.body.psw;
    if ( username == '' || req.body.password=='') {

        req.flash('message-danger', "Fill in all information")
            res.redirect('/login');


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
                            res.cookie('email', req.body.email,{httpOnly:true, maxAge:maxAge*1000});
                            res.cookie('name', req.body.name,{httpOnly:true, maxAge:maxAge*1000});
                            res.cookie('city', req.body.city,{httpOnly:true, maxAge:maxAge*1000});
                            res.cookie('age', req.body.age,{httpOnly:true, maxAge:maxAge*1000});
                            if(user.role===role_user) {

                                app.use(express.static(__dirname + '/'));
                                res.redirect('/shop');

                            }
                            else{
                                res.redirect('/admin')
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
function authRole(){
    return (res,req,next)=>{
        if(!(req.user.role.match('admin'))){
            res.status(401)
            return res.send('Not allowed')
        }
        next();
    }
}


const logout_get=(req,res)=>{
    res.cookie('jwt', '', {maxAge:1});
    res.clearCookie('email', { path: '/' });
    res.clearCookie('city', { path: '/' });
    res.clearCookie('name', { path: '/' });
    res.clearCookie('age', { path: '/' });
    res.redirect('/home')
}
module.exports={
    register,login,logout_get, authRole
}