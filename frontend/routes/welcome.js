var express = require('express');
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
	res.render('welcomePage');
})



router.route('/signup').post(function(req, res, next){
	//read email and password from req object
	var email = req.params.firstName1;
	var password = req.params.password;
	console.log("email :" +email);
	console.log(req.params);
})

module.exports = router;

