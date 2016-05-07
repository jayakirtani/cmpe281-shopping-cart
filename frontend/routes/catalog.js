var express = require('express');
var querystring = require('querystring');
var url = require('url');
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
    return res.redirect('/');
};

//Register the authentication middleware
//router.use('/catalog', isAuthenticated);

router.route('/').get(function(req, response, next) {
	 var sess = req.session;
		if(!sess.authorised){
			console.log("Not authorized user");
	        response.redirect('/');
		}else{
    //TODO: rest get call for products array
	var pageNumber = 1;
	var url_parts = url.parse(req.url, true);
	console.log(url_parts);
	var query = url_parts.query;
	console.log("url paramters ", query);
	if(query.p){
		pageNumber = query.p;
		 response.render('catalog', {
	            products: req.session.products,
	            p : pageNumber,
	            addtoCart:2,
             orderCreate:2,
	        });

	}else{
	if(query.s){
		 response.render('catalog', {
            products: req.session.products,
            p : pageNumber,
            addtoCart:2,
             orderCreate:2,
        });
	}else {
	var fbResponse = [];

    var ProductUrl = 'http://52.5.167.238:8080/products';
    http.get(ProductUrl, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;

        });
        res.on('end', function() {
        	console.log("body ", body);
        	 req.session.products = JSON.parse(body);
            response.render('catalog', {
                products: req.session.products,
                p : pageNumber,
                addtoCart:2,
                orderCreate:2,
            });
        });
    }).on('error', function(e) {
        console.log("Got an error: ", e);
    });
	}
	}
		}

    console.log("\n in catalog \n");


})

router.route('/addToCart').get(function(req, response, next) {
	var sess = req.session;
	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/');
	}else{
	var url = require('url');
	var pageNumber = 1;
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log("url paramters ", query.p)
	if(query.p){
		pageNumber = query.p;
	}
	response.render('catalog', {
        products: req.session.products,
        p : pageNumber,
        addtoCart:2,
        orderCreate:2,
    });
	}
})

	
	

router.route('/addToCart').post(function(req, response, next) {
	var sess = req.session;
	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/');
	}else{
	var url = require('url');
	var pageNumber = 1;
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log("url paramters ", query.p)
	if(query.p){
		pageNumber = query.p;
	}

	console.log("\n in addToCart \n");
    var data = {
	userId:	req.session.email,
	cartInfo: [{
		productId:req.body._id,
		productQuantity: req.body.qty,
		productName : req.body.title,
		productCost : req.body.price,
		productImage :req.body.imageUrl

	}
		]

    };

    var post_data = JSON.stringify(data);
    console.log('JSON request ', post_data);

    // add url and host information
    var post_options = {
        host: 'spring16-team3-riakcluster-elb-888977027.us-east-1.elb.amazonaws.com',
        port: '80',
        path: '/addToCart',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           'Accept' : 'application/json'
        }
    };
        console.log(post_options);
    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            var body = JSON.parse(chunk);
            console.log(chunk);
            //var body = chunk;
            console.log('Response: ' + chunk);
            if (body.status == "Failure") {
                console.log("false add to cart  \n");
                console.log("false add to cart  \n", body);
                response.render('catalog', {
                    products:  req.session.products,
                    p : pageNumber,
                    addtoCart:0,
                    orderCreate:2,
                });
            } else if (body.status=="Success") {
                console.log("successful add to cart ",body);
                response.render('catalog', {
                    products: req.session.products,
                    p : pageNumber,
                    addtoCart:1,
                    orderCreate:2,
                });
            }
        });
    });
    post_req.on('error', function(err) {
        console.log("\n on error on add to cart \n");
        response.render('catalog', {
            products: req.session.products,
            p : pageNumber,
            addtoCart:0,
            orderCreate:2,
        });
    });

    //post_req.setTimeout( 10000, function( ) {console.log("false add to cart  \n");
    //
    // response.render('catalog', {
    //     products:  req.session.products,
    //     p : pageNumber,
    //     addtoCart:0
    // });
    //
    // });
    
        console.log("now posting");
    // post the data
    post_req.write(post_data);
        console.log("now posted");
    post_req.end();
        console.log("now end");
	}
});


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


router.route('/pay').get(function(req, response, next) {
 	console.log("in pay");
 	 var sess = req.session;
 	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/');
	}else{
/*	var url_parts = url.parse(req.url, true);
	console.log(url_parts);
	var query = url_parts.query;
	if(query.f){
		var Searchurl ="http://52.5.167.238:8080/search/featured";
	}else{
		var Searchurl ="http://52.5.167.238:8080/search/"+query.s;
	}


    console.log(Searchurl);
    http.get(Searchurl, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
        	console.log("body ", body);
        	 req.session.products = JSON.parse(body);
        	 response.redirect('/catalog?s=1');
        });

    }).on('error', function(e) {
        console.log("Got an error: ", e);
        response.redirect('/catalog');
    });
	}
*/

		response.render('payment');
	}
});

module.exports = router;
