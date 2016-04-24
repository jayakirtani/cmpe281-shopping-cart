/**
 * Populate DB with sample data on server start
 * to disable, edit server.js, and set `seedDB: false`
 */
var mongoose    = require('mongoose');
var config      = require('./mongoConnect'); // get db config file
var product     = require('../mongo-models/product.model');

mongoose.createConnection(config.database);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

var newProducts = [{
    title: 'cat food',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'food','cat','eatables'],
    description: 'Food for cats'
}, {
    title: 'dog clothes',
    imageUrl: '/assets/uploads/meantshirt.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['clothing','wearables','dog','featured','clothes'],
    description: 'Dog clothes'
}, {
    title: 'dog chain',
    imageUrl: '/assets/uploads/meanmug.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','dog','chain'],
    description: 'Accessories for the animals'
}];

product.collection.insert(newProducts,onInsert);

function onInsert(err,docs) {
    if(err)
    {
        console.log('error :' +err);
    }
    else
    {
        console.log("data inserted successfully");
    }
}

/*newProducts.save(function(err) {
    if (err) {
        console.log('error :' +err);
    }
    console.log("data inserted successfully");
});*/
