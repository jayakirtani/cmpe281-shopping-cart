var express = require('express');
var querystring = require('querystring');
var http = require('http');
var crypto = require('crypto');
var router = express.Router();

/* Render Login page on welcome*/
router.route('/login')
	.get(function(req, res, next) {
		res.render('login',{signup:false});
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
	res.render('welcomePage',{signup:true, emailexist:false,data:null});
})



router.route('/signup').post(function(req, response, next){

// hash password 
	var hashPassword = crypto
    .createHash("md5")
    .update(req.body.password)
    .digest('hex');
	
// prepare parameters to send 	
	 var data = {
	      'email' : req.body.email,
	      'password': hashPassword,
	      'firstname': req.body.firstname,
	      'lastname': req.body.lastname,
	       'address' :{
	    	 'addrline1':req.body.addrline1, 
	    	 'addrline2': req.body.addrline2,
	    	  'city' :req.body.city, 
	    	  'state': req.body.state,
	    	  'zip': req.body.zip,
	    	  'country': req.body.country,
	   },
	    	 
	    	  'contactnumber': req.body.contactnumber
	  };
	var post_data = JSON.stringify(data);
	 
	 console.log('JSON request body ', post_data);

	  // add url and host information
	  var post_options = {
	      host: '52.5.167.238',
	      port: '8080',
	      path: '/signup',
	      method: 'POST',
	      headers: {
	          'Content-Type': 'application/json',
	          'Content-Length': Buffer.byteLength(post_data)
	      }
	  };
	  
	  
	  // Set up the request
	  var post_req = http.request(post_options, function(res) {
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	    	  var body = JSON.parse(chunk);
	          console.log('Response: ' + chunk);
	         if(res.statusCode==400){
	        	 console.log("\n email already used \n");
	        	 response.render('welcomePage',{signup:false,emailexist:true,message:chunk.msg,data:data});
	          
	      }else if( body.success==false){
	    	  console.log( body.success,"\false sign up \n");
	    	  console.log("\false sign up \n",body.success );
	    	  response.render('welcomePage',{signup:false,emailexist:false,message:chunk.msg,data:data});
	      }
	         else if (res.statusCode==200 && body.success ==true){
	        	 console.log( "successful signup ", body.success);
	        	 response.render('login',{signup:true});
	      }
	         
	      });
	      
	  });
	  post_req.on('error', function (err) {
		  console.log("\n on error here \n");
		  response.render('welcomePage',{signup:false,emailexist:false, message:null,data:data}); 
      });
	  // post the data
	  post_req.write(post_data);
	  post_req.end();
	  
			
})

module.exports = router;

