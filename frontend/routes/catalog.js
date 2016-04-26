var express = require('express');
var querystring = require('querystring');
var http = require('http');
var router = express.Router();
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    // This part will be usefull in guest catalog browsing
    // //allow all get request methods
    // if(req.method === "GET"){
    //     return next();
    // }

    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/welcome');
};

//Register the authentication middleware
//router.use('/catalog', isAuthenticated);




router.route('/catalog').get(function(req, response, next) {
    //TODO: rest get call for products array 
	
	var fbResponse = [];
	 console.log("Im here ");
    var url = 'http://52.5.167.238:8080/products';
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
            
        });
        res.on('end', function() {
        	console.log("body ", body);
        	 req.session.products = JSON.parse(body);
            response.render('catalog', {
                products: req.session.products
            });
        });
    }).on('error', function(e) {
        console.log("Got an error: ", e);
    });
  /*  var products = [{
        img: "images/item_psd2html5.jpg",
        name: "name1",
        qty: 1,
        price: "price1",
        sku: "sku1",
        description: "description1"
    }]*/
    console.log("\n in catalog \n");
    
   
})
router.route('/addToCart').post(function(req, response, next) {
	console.log("\n in addToCart \n");
    var data = {
        qty: req.body.qty,
        price: req.body.price,
        _id: req.body._id,
        email: req.session.email
    };
    var post_data = JSON.stringify(data);
  
    console.log('JSON request ', data);
    
    
    // add url and host information
    var post_options = {
        host: '8',
        port: '8080',
        path: '/addToCart',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        
        res.on('data', function(chunk) {
            var body = JSON.parse(chunk);
            console.log('Response: ' + chunk);
            if (body.success == false) {
                console.log(body.success, "\false add to cart  \n");
                console.log("\false add to cart  \n", body.success);
                response.render('catalog', {
                    products:  req.session.products,
                    
                });
            } else if (res.statusCode == 200 && body.success == true) {
                console.log("successful add to cart ", body.success);
                response.render('catalog', {
                    products: req.session.products,
                    
                });
            }
        });
    });
    post_req.on('error', function(err) {
        console.log("\n on error on add to cart \n");
        response.render('catalog', {
            products: req.session.products,
            
        });
    });
    // post the data
    post_req.write(post_data);
    post_req.end();
})

/*
router.route('/catalog')
    // Not useful now. Can be later if catalog adding added for admin console
    // .post(function(req, res){

    //     // Todo add to cart and update cart on UI

    //     // var post = new Post();
    //     // post.text = req.body.text;
    //     // post.created_by = req.body.created_by;
    //     // post.save(function(err, post) {
    //     //     if (err){
    //     //         return res.send(500, err);
    //     //     }
    //     //     return res.json(post);
    //     // });
    // })

    //gets all posts

    .get(function(req, res){
    	
    	
        // Todo fetch catalog from databse
        // console.log('debug1');
        // Post.find(function(err, posts){
        //     console.log('debug2');
        //     if(err){
        //         return res.send(500, err);
        //     }
        //     return res.send(200,posts);
        // });
    	
    	res.render('catalog');
    });

//post-specific commands. likely won't be used
router.route('/catalog/:id')
    //gets specified post
    .get(function(req, res){
        // Todo send json of one catalog product
        // Post.findById(req.params.id, function(err, post){
        //     if(err)
        //         res.send(err);
        //     res.json(post);
        // });
    });

    // Not useful now. Can be later if catalog adding added for admin console
    // 
    // //updates specified post
    // .put(function(req, res){
    //     Post.findById(req.params.id, function(err, post){
    //         if(err)
    //             res.send(err);

    //         post.created_by = req.body.created_by;
    //         post.text = req.body.text;

    //         post.save(function(err, post){
    //             if(err)
    //                 res.send(err);

    //             res.json(post);
    //         });
    //     });
    // })
    // //deletes the post
    // .delete(function(req, res) {
    //     Post.remove({
    //         _id: req.params.id
    //     }, function(err) {
    //         if (err)
    //             res.send(err);
    //         res.json("deleted :(");
    //     });
    */

module.exports = router;