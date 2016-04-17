//var mongoose    = require('mongoose');
var config      = require('../../config/mongoConnect'); // get db config file
var products    = require('../../mongo-models/product.model');

//mongoose.createConnection(config.database);

var productRouter = function(app) {

    app.get("/products", function(req, res) {
        //res.send("Hello Customer");
        products.find({}, function(err, docs) {
            //res.render('/products', {users: users});
            if(err)
            {
                console.log('error :' +err);
                return res.status(400).json({success: false, msg: 'Could not fetch products from database'});
            }
            //return res.end(JSON.stringify(product));
            res.send(JSON.parse(JSON.stringify(docs)));
        });

    });
};

module.exports = productRouter;