const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');

let port=process.env.PORT || 3000;
//const Item=require('../models/itemModel');


const app= express();
const flash=require('connect-flash');


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

mongoose
    .connect('mongodb+srv://gudron:gudron@cluster.i6zdr.mongodb.net/Shop?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

app.set('view engine','ejs');

const homeRoute=require('./routes/home');
const loginRoute=require('./routes/login');
const routeRegister=require('./routes/register');
const adminRoute=require('./routes/admin');
const addRoute=require('./routes/add');
const editRoute=require('./routes/edit');
const displayRoute=require('./routes/display');
const deleteRoute=require('./routes/delete');
const sortedRoute=require('./routes/sorted');
const sortedCityRoute=require('./routes/sortedcity');
const shopRoute=require('./routes/shop');

const itemRoute=require('./routes/items');
const logoutRoute=require('./routes/logout');
const {checkUser}=require('./middleware/authMiddleware');
const {requireAuth} =require('./middleware/authMiddleware');



app.use(cookieParser('secret'));
app.use(session({
    secret: '<session_secret>',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 3600000}   // 1 hour (in milliseconds)
}));
app.use(flash());


app.use(express.static('public'));

app.use(express.static(__dirname + '/'));
app.use('/home',checkUser,homeRoute);
app.use('/login',loginRoute);
app.use('/register',routeRegister);
app.use('/admin',//requireAuth,
 adminRoute);
app.use('/admin', addRoute);
app.use( '/admin', editRoute);
app.use( '/admin', displayRoute);
app.use( '/admin', deleteRoute);
app.use( '/admin', sortedRoute);
app.use( '/admin', sortedCityRoute);
app.use('/shop', shopRoute);
app.use('/shop', itemRoute);
app.use('/logout', logoutRoute);
app.get('*', checkUser)
app.get('/', (req,res)=>{
    res.render('home');

})

app.listen(port, () => console.log('The server is running port 3000...'));