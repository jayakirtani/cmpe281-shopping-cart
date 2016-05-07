var express = require('express');
var router = express.Router();
var request = require("request");
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
    return res.redirect('/');
}

//Register the authentication middleware
//router.use('/cart', isAuthenticated);
var SigninURL = "http://spring16-team3-riakcluster-elb-888977027.us-east-1.elb.amazonaws.com/";

router.route('/removeitem').get(function (req, res) {
    if (!req.session.authorised) {
        res.redirect('/');
        return;
    }
    console.log("/cart/removeitem get");

    var email = req.session.email;
    var productID = req.params['p'];

    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: SigninURL + "/removeItem",
        form: {
            "userId": email,
            "cartInfo": [{
                "productId": productID,
            },],
        },
    }, function (error, response, body) {
        res.redirect('/cart');
    });
});

router.route('/cart').get(function (req, res) {
    if (!req.session.authorised) {
        res.redirect('/');
        return;
    }
    console.log("/cart get");

    var email = req.session.email;
    request.get({
        url: SigninURL + "/getCart?userId=" + email,
    }, function (error, response, body) {
        if (response.statusCode == 200 || response.statusCode == 400) {
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
            //error in fetching data
            if (parse.userId === email) {
                console.log("successful");
                res.render('cart', {
                    cartItems: parse.cartInfo,
               
                });
            } else {
                console.log("error in fetching data ");
                res.redirect('/');
            }
        } else {
            res.redirect('/catalog');
        }
    });
})
.delete(function (req, res) {
    if (!req.session.authorised) {
        res.redirect('/');
        return;
    }
    var email = req.session.email;
    var productID = req.body.productID;
    var productQuantity = req.body.quatity;

    if (productQuantity == 0) {
        request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: SigninURL + "/removeItem",
            form: {
                "userId": email,
                "cartInfo": [{
                    "productId": productID,
                },],
            },
        }, function (error, response, body) {
            res.redirect('');
            // if (body.status == "Success") {
            //     res.redirect('/cart')
            // } else {
            //     res.redirect('/cart', {errorMsg: "Could not add product to cart. Please try again."});
            // }
        });
    }
    else {
        request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: SigninURL + "/updateItem",
            form: {
                "userId": email,
                "cartInfo": [{
                    "productId": productID,
                    "productQuantity": quatity,
                },],
            },
        }, function (error, response, body) {
            res.redirect('/cart');
            // if (body == "Success") {
            //     res.redirect('/cart')
            // } else {
            //     res.redirect('/cart', {errorMsg: "Could not add product to cart. Please try again."});
            // }
        });
    }
});


router.route('/createOrder').post(function (req, resm) {
    if (!req.session.authorised) {
        resm.redirect('/');
        return;
    }
    console.log("/cart create order post");
    var products = JSON.parse(req.body["cartdetails"]);
    var postData = {};
    postData.customerid = req.session.email;
    postData.totalamount =products.length;
    postData.products = products;
    postData.paymentdetails = {};
    postData.paymentdetails.nameoncard = req.body["card-holder-name"];
    postData.paymentdetails.cardnumber = req.body["card-number"];
    postData.paymentdetails.cvv = req.body["cvv"];
    postData.paymentdetails.expirydate = req.body["expiry-month"] + "/" + req.body["expiry-year"];
    postData.billingaddress = {
        "addresline1": req.body["addrline1"],
        "addrline2": req.body["addrline2"],
        "city": req.body["city"],
        "state": req.body["state"],
        "zip": req.body["zip"],
        "country": req.body["country"]
    };
    console.log(JSON.stringify(postData));
    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
      //  url: SigninURL this is not the create order  + "/createOrder",
        url : "http://52.5.167.238:8080/createOrder",
        form: postData
    }, function (error, response, body) {
        console.log("Error" ,error);
        console.log("Body " ,body);
        if (body.success == true) {
        	resm.render('catalog', {
 	            products: req.session.products,
 	            p : 1,
 	            addtoCart:2,
 	            orderCreate :1
 	        });
        } else {
        	resm.render('catalog', {
 	            products: req.session.products,
 	            p : 1,
 	            addtoCart:2,
 	           orderCreate :0
 	        });
        }
    });
});

module.exports = router;