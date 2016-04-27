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
}, {
    title: 'cat neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','wearable'],
    description: 'Ring for cats'
},{
    title: 'Green Parrot neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','wearable','featured'],
    description: 'Ring for birds-green parrot'
},{
    title: 'Donkey food',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 9,
    stock: 13,
    rating: 4,
    categories: ['pet', 'food','Donkey','eatables'],
    description: 'Food for donkey'
}, {
    title: 'Monkey clothes',
    imageUrl: '/assets/uploads/meantshirt.jpg',
    price: 12,
    stock: 2,
    rating: 4,
    categories: ['clothing','wearables','monkey','featured','clothes'],
    description: 'Monkey clothes'
}, {
    title: 'Bear chain',
    imageUrl: '/assets/uploads/meanmug.jpg',
    price: 6,
    stock: 8,
    rating: 3,
    categories: ['accessories','Bear','chain'],
    description: 'Accessories for Bear'
}, {
    title: 'Donkey leg ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 7,
    stock: 3,
    rating: 2,
    categories: ['pet', 'accessories','Donkey','wearable'],
    description: 'Ring for donkeys'
},{
    title: 'Eagle neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 9,
    stock: 4,
    rating: 5,
    categories: ['pet', 'accessories','birds','wearable','featured','eagle'],
    description: 'Ring for birds-Eagle'
},{
    title: 'Tiger food',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 6,
    stock: 3,
    rating: 2,
    categories: ['pet', 'food','tiger','eatables'],
    description: 'Food for tiger'
}, {
    title: 'elephant clothes',
    imageUrl: '/assets/uploads/meantshirt.jpg',
    price: 6,
    stock: 8,
    rating: 4,
    categories: ['clothing','wearables','elephant','featured','clothes'],
    description: 'Elephant clothes'
}, {
    title: 'Goat chain',
    imageUrl: '/assets/uploads/meanmug.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','goat','chain'],
    description: 'Accessories for the goat'
}, {
    title: 'mice neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','mice','wearable'],
    description: 'Ring for mice'
},{
    title: 'love birds neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','wearable','featured','ring'],
    description: 'Ring for birds-love birds'
},{
    title: 'zebra food',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'food','zebra','eatables'],
    description: 'Food for zebra'
}, {
    title: 'Bull dog clothes',
    imageUrl: '/assets/uploads/meantshirt.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['clothing','wearables','BullDog','featured','clothes'],
    description: 'Bull dog clothes'
}, {
    title: 'Rabbit chain',
    imageUrl: '/assets/uploads/meanmug.jpg',
    price: 6,
    stock: 4,
    rating: 9,
    categories: ['accessories','rabbit','chain'],
    description: 'Accessories for the rabbit'
}, {
    title: 'Warewolves neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','warewolves','wearable'],
    description: 'Ring for warewolves'
},{
    title: 'Panther neck ring',
    imageUrl: '/assets/uploads/meanbook.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['accessories','Panther','wearable','featured','wildAnimal'],
    description: 'Ring for Panther'
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
