var express = require('express');
var querystring = require('querystring');
var http = require('http');
var router = express.Router();

/* Render Login page on welcome*/
router.route('/login')
	.get(function(req, res, next) {
		res.render('login');
	})

	.post(function(req, res, next){
		//read email and password from req object
		var email = req.params.email;
		var password = req.params.password;

		//TODO: encrypt password if required. Could be done on client side too
		//TODO: make REST call to database layer and authenticate user

		var validUser = true;
		if(validUser){
			//TODO: setup session and cookie
			res.redirect('/catalog');
		}
		else{
			res.json({message:"Unregistered email id or wrong password"});
		}
	});

router.route('/').get(function(req, res, next) {
	res.render('welcomePage',{error:false});
})



router.route('/signup').post(function(req, res, next){
	//read email and password from req object
	
	// make a restcall 

	
	 var post_data = JSON.stringify({
	      'email' : req.body.email,
	      'password': req.body.password,
	      'firstname': req.body.firstname,
	      'lastname': req.body.lastname,
	       'address' :{
	    	 'addrline1':req.body.addressLine1, 
	    	 'addrline2': req.body.addressLine2,
	    	  'city' :req.body.city, 
	    	  'state': req.body.region,
	    	  'zip': req.body.postalCode,
	    	  'country': req.body.country,
	   },
	    	 
	    	  'contactnumber': req.body.contactnumber
	  });
	 console.log('here they are ', post_data);

	  // add url and host information
	  var post_options = {
	      host: 'host',
	      port: '8080',
	      path: '/',
	      method: 'POST',
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded',
	          'Content-Length': Buffer.byteLength(post_data)
	      }
	  };

	  // Set up the request
	  var post_req = http.request(post_options, function(res) {
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	          console.log('Response: ' + chunk);
	          res.render('welcomePage',{signup:true});
	      
	          // TODO: read response data :true or false and redirect accordingly 
	      });
	      
	  });
	  post_req.on('error', function (err) {
		  console.log("\n on error here \n");
    	  res.render('welcomePage',{signup:true}); 
      });
	  // post the data
	  post_req.write(post_data);
	  post_req.end();
	  
	  
			
			
})

module.exports = router;

