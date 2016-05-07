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
    title: 'Cat Food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5220374_main_t300x300.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'food','cat','eatables'],
    description: 'Food for cats'
}, {
    title: 'Dog clothes',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5245695_main_t300x300.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['clothing','wearables','dog','featured','clothes'],
    description: 'Dog clothes'
}, {
    title: 'Dog Collar',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5247136_main_t300x300.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','dog','chain','collar'],
    description: 'Accessories for dog'
}, {
    title: 'Bow tie cat collar',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5207837_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','wearable'],
    description: 'Collar for cats'
},{
    title: 'Bird cage',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5067562_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','cage','featured'],
    description: 'cages for birds'
},{
    title: 'Bowl for birds',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5083409_main_t300x300.jpg',
    price: 9,
    stock: 13,
    rating: 4,
    categories: ['pet', 'food','bird','eatables'],
    description: 'bowl to keep food for birds'
}, {
    title: 'Bird food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5150585_main_t300x300.jpg',
    price: 12,
    stock: 2,
    rating: 4,
    categories: ['food','eatables','birds','featured'],
    description: 'Food for birds'
}, {
    title: 'Fish Aquarium',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5122549_main_t300x300.jpg',
    price: 6,
    stock: 8,
    rating: 3,
    categories: ['fish','aquarium','glass','large'],
    description: 'House for fish'
}, {
    title: 'Bedding for dog',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5155246_main_t300x300.jpg',
    price: 7,
    stock: 3,
    rating: 2,
    categories: ['pet', 'accessories','dog','bedding'],
    description: 'Dog Bedding'
},{
    title: 'Dog dental care',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5215813_main_t300x300.jpg',
    price: 9,
    stock: 4,
    rating: 5,
    categories: ['pet', 'accessories','dog','teeth','featured','dental'],
    description: 'Dental care for dogs'
},{
    title: 'Cat dental care',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5210744_main_t300x300.jpg',
    price: 6,
    stock: 3,
    rating: 2,
    categories: ['pet', 'food','cat','teeth'],
    description: 'Dental care for cats'
}, {
    title: 'Bedding for cat',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5172722_main_t300x300.jpg',
    price: 6,
    stock: 8,
    rating: 4,
    categories: ['bedding','cat','featured','deluxe'],
    description: 'Deluxe cat bedding'
}, {
    title: 'Turtle food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5210922_main_t300x300.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','turtle','aquatic','food'],
    description: 'Aquatic turtle food'
}, {
    title: 'Pig food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5134194_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'food','pig','eatable'],
    description: 'Food for guinea pig '
},{
    title: 'Bird perch',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5086242_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','perch','featured'],
    description: 'warm perch for birds'
},{
    title: 'Cat Scratcher',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5246419_main_t300x300.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'grooming','cat','clothing'],
    description: 'Scratcher for cat'
}, {
    title: 'Litter for birds cage',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5180840_main_t300x300.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['litter','cage','bird','featured','eatables'],
    description: 'Litter that can be put into cage of birds'
}, {
    title: 'Cat collar',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5191472_main_r200.jpg',
    price: 6,
    stock: 4,
    rating: 9,
    categories: ['accessories','cat','collar', 'flea'],
    description: 'Flea tick cat collar'
}, {
    title: 'Clumping Cat liiter',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-2621304_main_r200.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','litter','clumping'],
    description: 'Instant action clumping cat litter'
},{
    title: 'Bird mesh seed guard',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5196578_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['accessories','birds','mesh','featured','seed'],
    description: 'Bird Cage Mesh Seed Guard'
},{
    title: '2-story Chicken coop',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5228739_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['house','birds','coop','chicken'],
    description: 'Trixie 2-story chicken coop'
}, {
    title: 'Cat Food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-1221065_main_t300x300.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'food','cat','eatables'],
    description: 'Food for cats'
}, {
    title: 'Dog clothes',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5188033_main_t300x300.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['clothing','wearables','dog','featured','clothes','vest'],
    description: 'Kurgo Dog Life Vest'
}, {
    title: 'Dog Adjustable Harness',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5232741_main_t300x300.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','dog','chain','collar'],
    description: 'Paracord Reflective Adjustable Harness'
}, {
    title: 'Paw Cat Harness',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5191702_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','wearable','harness'],
    description: 'Glow in the Dark Paw Cat Harness'
},{
    title: 'Bird cage',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5136607_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','cage','featured'],
    description: 'cages for birds'
},{
    title: 'Bird Feeder',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5228724_main_t300x300.jpg',
    price: 9,
    stock: 13,
    rating: 4,
    categories: ['pet', 'food','bird','eatables','feeder'],
    description: 'Trixie Nantucket Bird Feeder'
}, {
    title: 'Bird food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5133738_main_t300x300.jpg',
    price: 12,
    stock: 2,
    rating: 4,
    categories: ['food','eatables','birds','featured'],
    description: 'Food for birds'
}, {
    title: 'Fish Aquarium',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5129698_main_t300x300.jpg',
    price: 6,
    stock: 8,
    rating: 3,
    categories: ['fish','aquarium','glass','large'],
    description: 'House for fish'
}, {
    title: 'Bedding for dog',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5227181_main_t300x300.jpg',
    price: 7,
    stock: 3,
    rating: 2,
    categories: ['pet', 'accessories','dog','bedding'],
    description: 'Dog Bedding'
},{
    title: 'Dog dental care',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5175180_main_t300x300.jpg',
    price: 9,
    stock: 4,
    rating: 5,
    categories: ['pet', 'accessories','dog','teeth','featured','dental'],
    description: 'Dental care for dogs'
},{
    title: 'Cat dental care',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5230444_main_t300x300.jpg',
    price: 6,
    stock: 3,
    rating: 2,
    categories: ['pet', 'food','cat','teeth'],
    description: 'Dental care for cats'
}, {
    title: 'Bedding for cat',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5239164_main_t300x300.jpg',
    price: 6,
    stock: 8,
    rating: 4,
    categories: ['bedding','cat','featured','deluxe'],
    description: 'Deluxe cat bedding'
}, {
    title: 'Turtle food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5164253_main_t300x300.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','turtle','aquatic','food'],
    description: 'Aquatic Turtle Floating Sticks'
}, {
    title: 'Rabbit food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5200400_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'food','rabbit','eatable'],
    description: 'Alfalfa Free Timothy Fiber Diet Rabbit Food'
},{
    title: 'Moon bird toy',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5180139_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','toy','featured'],
    description: 'Triple Moon Bird Toy'
},{
    title: 'Cat Brush',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5017343_main_t300x300.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'grooming','cat','clothing','brush'],
    description: 'ZoomGroom Cat Brush'
}, {
    title: 'Crumbled Paper Bedding',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5233101_main_t300x300.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['litter','cage','bird','featured','bedding','paper'],
    description: 'Small Animal Crumbled Paper Bedding'
}, {
    title: 'Cat ID tag',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5129169_main_t300x300.jpg',
    price: 6,
    stock: 4,
    rating: 9,
    categories: ['accessories','cat','collar', 'tag','heart'],
    description: 'Small Heart Personalized Pet ID Tag'
}, {
    title: 'Cat Litter',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-2621253_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','litter','scoopable'],
    description: 'Cat Ultra Scoopable Cat Litter'
},{
    title: 'Bird Cage Liners',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5181385_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['accessories','birds','mesh','featured','liners'],
    description: 'Super-Absorbent Bird Cage Liners'
},{
    title: 'Dog Snacks',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5116751_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['snacks','dog','featured','bones'],
    description: 'milk bones Original Dog Snacks'
},{
    title: 'Cat Food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5165217_main_t300x300.jpg',
    price: 6,
    stock: 14,
    rating: 3,
    categories: ['pet', 'food','cat','eatables'],
    description: 'Food for cats'
}, {
    title: 'Dog clothes',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5245700_main_t300x300.jpg',
    price: 14,
    stock: 4,
    rating: 5,
    categories: ['clothing','wearables','dog','featured','clothes'],
    description: 'Dog clothes'
}, {
    title: 'Dog Lifting Aid',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5197742_main_t300x300.jpg',
    price: 3,
    stock: 9,
    rating: 2,
    categories: ['accessories','dog','chain','collar','liftingaid'],
    description: 'Solvit Full Body Dog Lifting Aid'
}, {
    title: 'Bow tie cat collar',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5208596_main_t300x300.jpg',
    price: 2,
    stock: 11,
    rating: 2,
    categories: ['pet', 'accessories','cat','wearable','bow','tie'],
    description: 'Collar for cats'
},{
    title: 'Bird cage',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5134525_main_t300x300.jpg',
    price: 4,
    stock: 9,
    rating: 4,
    categories: ['pet', 'accessories','birds','cage','featured'],
    description: 'cages for birds'
},{
    title: 'Water Bird Cup',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5083409_main_t300x300.jpg',
    price: 9,
    stock: 13,
    rating: 4,
    categories: ['pet', 'food','bird','eatables'],
    description: 'Insight Clean Cup Feed & Water Bird Cup'
}, {
    title: 'Bird parrot food',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-1041188_main_t300x300.jpg',
    price: 12,
    stock: 2,
    rating: 4,
    categories: ['food','eatables','birds','featured','parrot'],
    description: 'Nutri-Berries Parrot Food'
}, {
    title: 'Fish Aquarium',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5248474_main_t300x300.jpg',
    price: 6,
    stock: 8,
    rating: 3,
    categories: ['fish','aquarium','glass','large'],
    description: '60 Gallon Heartland LED Aquarium with Stand'
}, {
    title: 'Bedding for dog',
    imageUrl: 'http://petus.imageg.net/PETNA_36/pimg/pPETNA-5213803_main_t300x300.jpg',
    price: 7,
    stock: 3,
    rating: 2,
    categories: ['pet', 'accessories','dog','bedding'],
    description: 'Dog Bedding'
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
