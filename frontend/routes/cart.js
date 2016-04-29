var express = require('express');
var router = express.Router();
//Used for routes that must be authenticated.
function isAuthenticated(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    // This part will be usefull in guest catalog browsing
    // //allow all get request methods
    // if(req.method === "GET"){
    //     return next();
    // }
    if (req.session.authorised) {
        return next();
    }
    // if (req.isAuthenticated()){
    //     return next();
    // }
    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/welcome');
};
//Register the authentication middleware
//router.use('/cart', isAuthenticated);
var SigninURL = "http://ec2-52-5-167-238.compute-1.amazonaws.com:8080";
router.route('/cart').get(function(req, res) {
    if (!req.session.authorised) {
        res.redirect('/welcome');
        return;
    }
    var email = req.session.email;
    request.get({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: SigninURL + "/cart",
        form: {
            email: email
        },
    }, function(error, response, body) {
        try {
            console.log(body);
            var parse = JSON.parse(body);
        } catch (e) {
            console.log("error in parsing json");
            //error in parsing json
            console.log(e);
            res.redirect('/catalog');
            return;
        }
        console.log(parse);
        console.log(email);
        if (response.statusCode == 200 || response.statusCode == 400) {
            //error in fetching data
            if (parse.success === false) {
                console.log("error in fetching data " + parse);
                var errormessage = parse.msg;
                res.redirect('/catalog');
            } else {
                console.log("successcessfull");
                res.render('/cart', {
                    cartItems: parse,
                });
            }
        } else {
            res.redirect('/catalog');
        }
    });
}).post(function(req, res) {
    if (!req.session.authorised) {
        res.redirect('/welcome');
        return;
    }
    var email = req.session.email;
    var productID = req.body.productID;
    var quatity = req.body.quatity;
    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: SigninURL + "/cart",
        form: {
            email: email,
            productID: productID,
            quantity: quatity,
        },
    }, function(error, response, body) {
        //TODO
        // try {
        //     console.log(body);
        //     var parse = JSON.parse(body);
        // } catch (e) {
        //     console.log("error in parsing json");
        //     //error in parsing json
        //     console.log(e);
        //     res.redirect('/catalog');
        //     return;
        // }
        // console.log(parse);
        // console.log(email);
        // if (response.statusCode == 200 || response.statusCode == 400) {
        //     //error in fetching data
        //     if (parse.success === false) {
        //         console.log("error in fetching data " + parse);
        //         var errormessage = parse.msg;
        //         res.redirect('/catalog');
        //     } else {
        //         console.log("successcessfull");
        //         res.render('/cart', {
        //             cartItems: parse,
        //         });
        //     }
        // } else {
        //     res.redirect('/catalog');
        // }
    });
}).delete(function(req.res) {
    if (!req.session.authorised) {
        res.redirect('/welcome');
        return;
    }
    var email = req.session.email;
    var productID = req.body.productID;
    request.delete({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: SigninURL + "/cart",
        form: {
            email: email,
            productID: productID,
        },
    }, function(error, response, body) {
        //todo
    });
});
module.exports = router;
