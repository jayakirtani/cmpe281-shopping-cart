var express = require('express');
var querystring = require('querystring');
var http = require('http');
var url = require('url');
var request = require("request");
var crypto = require('crypto');
var router = express.Router();
/*Handle logout request*/
router.route('/logout').get(function(req, res, next) {
    console.log("GET /logout");
    req.session.destroy(function(err) {
        if (err) {
            req.session.authorised = false;
            req.session.email = 'guest';
            console.log(err);
        } else {
        	 res.render('login', {
        	        signup: false,
        	        error: false,
        	        msg: ''
        	    });
        }
    });
   
    /* handle post request - user authentication */
});
/* Render Login page on welcome*/
router.route('/login').get(function(req, res, next) {
    console.log("GET /login");
    res.render('login', {
        signup: false,
        error: false,
        msg: ''
    });
    /* handle post request - user authentication */
}).post(function(req, res, next) {
    //read email and password from req object
    var hash = crypto.createHash("md5"); //use digest('hex')
    var email = req.body.email;
    var password = hash.update(req.body.password).digest('hex');
    console.log(password);
    var SigninURL = "http://ec2-52-5-167-238.compute-1.amazonaws.com:8080";
    request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: SigninURL + "/login",
            form: {email: email, password: password},
        }, function(error, response, body) {
        try {
            console.log(body);
            var parse = JSON.parse(body);
        } catch (e) {
            console.log("error in parsing json");
            //error in parsing json
            console.log(e);
            res.render('login', {
                signup: false,
                error: true,
                msg: e.message,
            });
        }
        console.log(parse);
        console.log(email);
        console.log(password);

		if (response.statusCode == 200 || response.statusCode == 400) {
            //error in authentication
            if (parse.success === false){
            	console.log("error in authentication. " + parse.msg);
            	var errormessage = parse.msg;
            	res.render('login', {
	                signup: false,
	                error: true,
	                msg: errormessage,
            	});
            }
            else {
            	console.log("Authentication successcessfull");
                //authentication successfull
                //save data in cookie
                var sess = req.session;
                sess.authorised = true;
                sess.email = email;
                res.redirect('/catalog');
            }
        }
        else
        {
        	res.render('login', {
	                signup: false,
	                error: true,
	                msg: error.message + ", Unexpected error please try again."
            	});
        }
    });
});
router.route('/').get(function(req, res, next) {
    res.render('welcomePage', {
        signup: true,
        emailexist: false,
        data: null
    });
});

router.route('/signup').post(function(req, response, next) {
    // hash password
    var hash = crypto.createHash("md5"); //use digest('hex')
    var hashPassword = hash.update(req.body.password).digest('hex');
    console.log(hashPassword);
    // prepare parameters to send
    var data = {
        'email': req.body.email,
        'password': hashPassword,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'address': {
            'addrline1': req.body.addrline1,
            'addrline2': req.body.addrline2,
            'city': req.body.city,
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
        res.on('data', function(chunk) {
            var body = JSON.parse(chunk);
            console.log('Response: ' + chunk);
            if (res.statusCode == 400) {
                console.log("\n email already used \n");
                response.render('welcomePage', {
                    signup: false,
                    emailexist: true,
                    message: chunk.msg,
                    data: data
                });
            } else if (body.success == false) {
                console.log(body.success, "\false sign up \n");
                console.log("\false sign up \n", body.success);
                response.render('welcomePage', {
                    signup: false,
                    emailexist: false,
                    message: chunk.msg,
                    data: data
                });
            } else if (res.statusCode == 200 && body.success == true) {
                console.log("successful signup ", body.success);
                response.render('login', {
                    signup: true,
                    error: false,
                    msg: ''
                });
            }
        });
    });
    post_req.on('error', function(err) {
        console.log("\n on error here \n");
        response.render('welcomePage', {
            signup: false,
            emailexist: false,
            message: null,
            data: data
        });
    });
    // post the data
    post_req.write(post_data);
    post_req.end();
});

// Search API

router.route('/search').post(function(req, response, next) {
	console.log("in Search");
	 var sess = req.session;
	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/');
	}else{

    var serachInput =  req.body.searchInput;
    var Searchurl ="http://52.5.167.238:8080/search/"+serachInput;
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
})
router.route('/search').get(function(req, response, next) {
 	console.log("in Search");
 	 var sess = req.session;
 	if(!sess.authorised){
		console.log("Not authorized user");
        response.redirect('/');
	}else{
	var url_parts = url.parse(req.url, true);
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


})
module.exports = router;
