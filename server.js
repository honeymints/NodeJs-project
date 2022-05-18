const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');

const app = express();
const flash=require('connect-flash');


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/Shop';
mongoose.connect(url, { useNewUrlParser: true },(err)=>{
    if(err){
        console.log("an error occurred");
    }
    else{
        console.log("db has connected");
    }
});

app.set('view engine','ejs');

const homeRoute=require('./routes/home');
const loginRoute=require('./routes/login');
const routeRegister=require('./routes/register');
const quotesRoute=require('./routes/quotes');
const adminRoute=require('./routes/admin');
const addRoute=require('./routes/add');
const editRoute=require('./routes/edit');
const displayRoute=require('./routes/display');
const deleteRoute=require('./routes/delete');
const sortedRoute=require('./routes/sorted');
const sortedCityRoute=require('./routes/sortedcity');

app.use(express.static('public'));

app.use(express.static(__dirname + '/'));


app.use(cookieParser('secret'));
app.use(session({
    secret: '<session_secret>',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 3600000}   // 1 hour (in milliseconds)
}));
app.use(flash());


app.use('/home',homeRoute);
app.use('/login',loginRoute);
app.use('/register',routeRegister);
app.use('/quotes', quotesRoute);
app.use('/admin', adminRoute);
app.use('/add', addRoute);
app.use( '/edit', editRoute);
app.use( '/display', displayRoute);
app.use( '/delete', deleteRoute);
app.use( '/sort', sortedRoute);
app.use( '/sortCity', sortedCityRoute);


app.get('/', (req,res)=>{
    res.render('home');

})

app.listen(3000, () => console.log('The server is running port 3000...'));