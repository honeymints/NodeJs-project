let path=require('path');
const express=require('express');
const app=express();
let router=express.Router();
let cart=require('../models/cartModel')
let item=require('../models/itemModel');
let add=require('../models/add')
const {requireAuth} =require('../middleware/authMiddleware');

router.get('/', requireAuth, function(request, response, next){
    item.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('ShopProduct', {data:{name: docs}})
        }
    });
})
router
    .route('/cart')
    .get(function(request, response, next){
    let email=request.cookies.email;
    cart.find({user:email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{

            response.render('cartView', {data:{name: docs}})
        }
    });
})
    .post(function(request, response, next){
        let email=request.cookies.email;
        let history=require('../models/historyModel')
        cart.insertMany({ name: request.body.name, quantity:1, user:request.cookies.email }, function(err,docs){
            if (err) throw err;
            cart.find({user:email}, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    history.insertMany({user:email,quantity:1, name:request.body.name, added:false})
                    response.render('cartView', {data: {name: docs}})

                }
            });
        });

    });
router
    .route('/account')
    .get(requireAuth, function(request, response, next){
        response.render('clientaccount')
    })

router
    .route('/payment')
    .get( function(request, response, next){
        response.render('payment')
    })
    .post(function (request, response,next){
        response.render('payment')
    })

router
    .route('/success')
    .post(function(request, response, next){
        let history=require('../models/historyModel')
        let old = {user:request.cookies.email, added:false};
       let time=new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60)))).toISOString()
        let update = {user:request.cookies.email, added:true, time:time};
        cart.deleteMany({user:request.cookies.email}, function(err,docs) {
            history.updateMany(old, update, {upsert: true}, function(err, docs) {
                if (err) {
                    console.log(err);
                }
            })
            if (err) throw err;
            else{
                response.render('success')
            }
        })
    })


router
    .route('/history')
    .get(function(request, response, next){
        let history=require('../models/historyModel')
        history.find({user:request.cookies.email, added:true},function(err,docs) {
            if (err){
                console.log(err);
            }
            else {
                response.render('history', {docs})
            }
        })
    })


router
    .route('/chat')
    .get( function(request, response, next){
    let chat=require('../models/chatModel');
    let user=require('../models/User');
    chat.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('userchat', {data:{name: docs}})
        }
    });
})
    .post( function(request, response, next){
    let chat=require('../models/chatModel');
    let email=request.cookies.email
    console.log(email)
    chat.insertMany({ name: request.cookies.email, message: request.body.message}, function(err,docs) {
        if (err) throw err;
        chat.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('userchat', {data:{name: docs}})
            }
        });
    });
});

router
    .route('/deletecart')
    .post( function(request, response, next){
    let cart=require('../models/cartModel');
    let history=require('../models/historyModel');
    cart.deleteOne({ user: request.cookies.email}, function(err,docs) {
        history.deleteOne({ user: request.cookies.email}, function(err,docs) {
            if (err) {
                throw err;
            }
        })
        if (err) throw err;

        cart.find({ user: request.cookies.email}, function (err, docs) {

            if (err){
                console.log(err);
            }
            else{

                response.render('cartView', {data:{name: docs}})
            }
        });
    });
});

router
    .route('/cartadd')
    .post( function(request, response, next){
    let cart=require('../models/cartModel');
    let history=require('../models/historyModel')
    var query = {name: request.body.name
        ,user:request.cookies.email};
    var update = {name: request.body.name,
        user:request.cookies.email,
        quantity: request.body.quantity};
    cart.findOneAndUpdate(query, update, {upsert: true}, function(err, docs) {
        history.findOneAndUpdate(query, update, {upsert: true}, function(err, docs) {
            if (err){
                console.log(err);
            }
        })
        if (err){
            console.log(err);
        }
        else{
            cart.find({user:request.cookies.email}, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{

                    response.render('cartView', {data:{name: docs}})
                }
            });
        }
    });
});

router
    .route('/reviews')
    .get(function(request, response, next){
    let rew=require('../models/rewModel')
    rew.find({}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('reviews', {data:{name: docs}})
        }
    });
})
    .post(function(request, response, next){
        let rew=require('../models/rewModel')
        rew.insertMany({ product: request.body.product, name: request.body.name, feedback: request.body.feedback,grade: request.body.grade}, function(err,docs) {
            if (err) throw err;
            rew.find({}, function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                    response.render('reviews', {data:{name: docs}})
                }
            });
        });
    });
router
    .route('/viewprod')

    .post((req, res) => {
        add.findOne({product: req.body.product}, function (err, docss) {
            if (err){
                console.log(err)
            }
            else{
                res.render('viewprod', { docss})
            }
        })
    });
router
    .route('/newprod')
    .get( function(request, response, next){
        add.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                response.render('newprod', {data:{name: docs}})
            }
        });
    });
router
    .route('/profile')
    .get( function(request, response, next){
        let User=require('../models/User');
    User.find({email:request.cookies.email}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            response.render('editprof', {data:{name: docs}})
        }
    });
});

module.exports=router;