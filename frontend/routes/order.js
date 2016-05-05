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


router.route('/rate').post(function(req, response, next) {
	console.log("in rate");
	 var sess = req.session;
	 var pageNumber;
	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/welcome');
	}else{
		
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		if(query.p){
			pageNumber = query.p;
		} else{
			pageNumber = 1;
		}
		if(query.id){
			console.log(query.id);
			rateInput = req.body.rate;
			console.log(rateInput);
		var options = {
				  "host": "52.5.167.238",
				  "port": "8080",
				  "path": "/rating/"+query.id,
				  "method": "PUT",
				  "headers": { 
					  "Accept": "application/json",
				    "Content-Type" : "application/json",
				  }
		}
				var req = http.request(options, function(res) {
				  console.log('STATUS: ' + res.statusCode);
				  console.log('HEADERS: ' + JSON.stringify(res.headers));
				  res.setEncoding('utf8');
				  
				  res.on('data', function (chunk) {
				    console.log('BODY: ' + chunk);
				    console.log("success");
		        	
				    
					var orderHisUrl = 'http://52.5.167.238:8080/getOrderHistory/Sara@test.com';//+req.session.email;
				    http.get(orderHisUrl, function(res) {
				        var body = '';
				        res.on('data', function(chunk) {
				            body += chunk;
				            
				        });
				        res.on('end', function() {
				        	console.log("body ", body);
				        	sess.orders= JSON.parse(body);
				        	//response.render('orderHistory',{orders:req.session.orders, p:pageNumber});
				        	response.render('orderHistory',{orders:sess.orders, p :pageNumber});
				        	//response.render('test');
				        });
				    }).on('error', function(e) {
				        console.log("Got an error: ", e);
				    });
				    
				    
				    
				    
				    
				    
				    
				    
				  });
				});

				req.on('error', function(e) {
					console.log("Error");
					console.log(e);
					
			        	response.render('orderHistory',{orders:sess.orders, p :pageNumber});
				});
				var body = JSON.stringify({
					  "rating": rateInput
					});

				
				req.write(body);
				req.end();

				
	
		}else{
    response.redirect('/orderHis');
		}
	}
})

router.route('/orderHis').get(function(req, response, next) {
	 var sess = req.session;
	 var pageNumber;
	 var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
		if(!sess.authorised){
			console.log("Not authorized user");
	        response.redirect('/welcome');
		}else{
			if(query.p){
				pageNumber = query.p;
				response.render('orderHistory',{orders:req.session.orders, p:pageNumber});
				
			} else{
				pageNumber = 1;
			
			var orderHisUrl = 'http://52.5.167.238:8080/getOrderHistory/Sara@test.com';//+req.session.email;
		    http.get(orderHisUrl, function(res) {
		        var body = '';
		        res.on('data', function(chunk) {
		            body += chunk;
		            
		        });
		        res.on('end', function() {
		        	console.log("body ", body);
		        	 req.session.orders = JSON.parse(body);
		        	response.render('orderHistory',{orders:req.session.orders, p:pageNumber});
		        	//response.render('test');
		        });
		    }).on('error', function(e) {
		        console.log("Got an error: ", e);
		    });
			}
		}

    console.log("\n in Order History \n");
    
   
})
module.exports = router;