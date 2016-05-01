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
    return res.redirect('/welcome');
};

//Register the authentication middleware
//router.use('/catalog', isAuthenticated);




router.route('/orderHis').get(function(req, response, next) {
	 var sess = req.session;
		if(!sess.authorised){
			console.log("Not authorized user");
	        response.redirect('/welcome');
		}else{
			var orderHisUrl = 'http://52.5.167.238:8080/getOrderHistory/Sara@test.com';//+req.session.email;
		    http.get(orderHisUrl, function(res) {
		        var body = '';
		        res.on('data', function(chunk) {
		            body += chunk;
		            
		        });
		        res.on('end', function() {
		        	console.log("body ", body);
		        	 req.session.orders = JSON.parse(body);
		        	 response.render('orderHistory',{orders:req.session.orders});
		        });
		    }).on('error', function(e) {
		        console.log("Got an error: ", e);
		    });
			
			
    //TODO: rest get call for products array 
/*	var pageNumber = 1;
	var url_parts = url.parse(req.url, true);
	console.log(url_parts);
	var query = url_parts.query;
	console.log("url paramters ", query);
	if(query.p){
		pageNumber = query.p;
		 response.render('catalog', {
	            products: req.session.products,
	            p : pageNumber
	        });
		 
	}else{
	if(query.s){
		 response.render('catalog', {
            products: req.session.products,
            p : pageNumber
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
                p : pageNumber
            });
        });
    }).on('error', function(e) {
        console.log("Got an error: ", e);
    });
	}
	}
	  */
		}

    console.log("\n in Order History \n");
    
   
})
module.exports = router;