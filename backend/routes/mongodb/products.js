var config      = require('../../config/mongoConnect'); // get db config file
var products    = require('../../mongo-models/product.model');

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
            res.send(JSON.parse(JSON.stringify(docs)));
        });

    });

    app.get("/search/:term", function (req,res) {
        products.find({ $text: { $search: req.params.term }})
            .exec(function(err, results){
                if(err)
                {
                    return res.status(400).json({success: false, msg: 'Search query failed'});
                }
                console.log(results);
                res.send(JSON.parse(JSON.stringify(results)));
            });

    });

    app.put("/rating/:id",function(req,res){

       var conditions = {_id:req.params.id};
       var options = { upsert: true };

        //first get the ratings field
        var newRating = 0;
        var query = products.findOne({'_id':req.params.id}).select('rating');

          query.exec(function (err, doc) {
            if (err) return next(err);
              if(err)
                  return res.status(400).json({success: false, msg: 'Fetch failed for updating the rating'});
              newRating =  (Number(doc.rating)+ Number(req.body.rating))/2;
              var update = { $set: { rating: Math.round(newRating)}};

              products.update(conditions,update,options,function(err, results){
                  if(err)
                      return res.status(400).json({success: false, msg: 'Update for ratings failed'});
                  res.send(JSON.parse(JSON.stringify(results)));
              });

            });

        });
};

module.exports = productRouter;