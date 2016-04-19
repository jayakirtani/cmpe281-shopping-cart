var express = require('express');
var router = express.Router();

/* Render Login page on welcome*/
router.route('.')
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
module.exports = router;
