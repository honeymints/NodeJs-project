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
const quotesRoute=require('./routes/quotes');
const adminRoute=require('./routes/admin');
const addRoute=require('./routes/add');
const editRoute=require('./routes/edit');
const displayRoute=require('./routes/display');
const deleteRoute=require('./routes/delete');
const sortedRoute=require('./routes/sorted');
const sortedCityRoute=require('./routes/sortedcity');
const shopRoute=require('./routes/shop');
const cartRoute=require('./routes/cart');
const itemRoute=require('./routes/items');
const logoutRoute=require('./routes/logout');
const {checkUser}=require('./middleware/authMiddleware')

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

app.use('/home',checkUser,homeRoute);
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
app.use('/shop', shopRoute);
app.use('/cart', cartRoute);
app.use('/items', itemRoute);
app.use('/logout', logoutRoute);
app.get('*', checkUser)
app.get('/', (req,res)=>{
    res.render('home');

})

app.post('/deletecart', function(request, response, next){
    let cart=require('./models/cartModel');
    cart.deleteOne({ name: request.body.name}, function(err,docs) {
        if (err) throw err;
        cart.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('cartView', {data:{name: docs}})
            }
        });
    });
});
app.get('/account', function(request, response, next){
    response.render('clientaccount')
})
app.get('/payment', function(request, response, next){

    response.render('payment')
})
app.get('/success', function(request, response, next){

    response.render('success')
})



app.listen(port, () => console.log('The server is running port 3000...'));