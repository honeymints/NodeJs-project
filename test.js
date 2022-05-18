const express=require('express');

const mongodb=require('mongodb');


let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true
});

    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            console.log('connection is successful');
        } else {
            console.error(err);
        }
    });
mongoClient.connect(async function(error, mongo) {
    if (!error) {
        let db = mongo.db('test');
    } else {
        console.error(err);
    }
});

    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('test');
            let coll = db.collection('prod');
        } else {
            console.error(err);
        }

    });

mongoClient.connect(async function(error, mongo) {
    if (!error) {
        let db = mongo.db('test');
        let coll = db.collection('prod');
        await coll.find().sort({cost:1});
        let result= await coll.find().toArray();
            console.log(result);
    } else {
        console.error(err);
    }
});