const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://127.0.0.1'
// let db;
let collections = {};

// Initialize MongoDB

mongoClient.connect(mongoUrl, {useNewUrlParser: true},(error,client)=>{
    if(!error){
        console.log('Successfully connected to Mongo');
    }

    db = client.db('numerical-conversions');
    collections.numbers = db.collection('numbers');

});

module.exports = {
    collections : collections
}