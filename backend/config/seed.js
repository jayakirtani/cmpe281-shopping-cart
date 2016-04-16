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
    price: 25,
    stock: 250,
    categories: ['pet food', 'cat food'],
    description: 'Food for cats'
}, {
    title: 'dog clothes',
    imageUrl: '/assets/uploads/meantshirt.jpg',
    price: 15,
    stock: 100,
    categories: ['clothing'],
    description: 'dog clothes'
}, {
    title: 'dog chain',
    imageUrl: '/assets/uploads/meanmug.jpg',
    price: 8,
    stock: 50,
    categories: ['accessories'],
    description: 'accessories for the animals'
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
