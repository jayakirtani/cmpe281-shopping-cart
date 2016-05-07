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

router.route('/').get(function (req, res) {
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
// .post(function (req, res) {
//     if (!req.session.authorised) {
//         res.redirect('/');
//         return;
//     }
//     console.log("/cart post");
//     var email = req.session.email;
//     var productID = req.body.productID;
//     var quantity = req.body.quantity;
//     var productName = req.body.productName;
//     var productCost = req.body.productCost;
//     var productImage = req.body.productImage;
//
//     request.post({
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//         url: SigninURL + "/addToCart",
//         form: {
//             "userId": email,
//             "cartInfo": [{
//                 "productId": productID,
//                 "productQuantity": quantity,
//                 "productName": productName,
//                 "productCost": productCost,
//                 "productImage": productImage,
//             },],
//         },
//     }, function (error, response, body) {
//         if (body == "Success") {
//             res.redirect('/catalog')
//         } else {
//             res.redirect('/catalog', {errorMsg: "Could not add product to cart. Please try again."});
//         }
//     });
// })
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
            res.redirect('/cart');
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


router.route('/createOrder').post(function (req, res) {
    if (!req.session.authorised) {
        res.redirect('/');
        return;
    }
    console.log("/cart create order post");
    var postData = {};
    postData.customerid = req.session.email;
    postData.products = JSON.parse(req.body["cartdetails"]);
    postData.paymentdetails = {};
    postData.paymentdetails.nameoncard = req.body["card-holder-name"];
    postData.paymentdetails.cardnumber = req.body["card-number"];
    postData.paymentdetails.cvv = req.body["cvv"];
    postData.paymentdetails.expirydate = req.body["expiry-month"] + "/" + req.body["expiry-year"];
    postData.billingaddress = {
        "addresline1": "",
        "addrline2": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
    };

    console.log(JSON.stringify(postData));
    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: SigninURL + "/createOrder",
        form: postData
    }, function (error, response, body) {
        if (body.success == true) {
            res.redirect('/catalog', {orderplaced: 1})
        } else {
            res.redirect('/catalog', {orderplaced: 0});
        }
    });
});

module.exports = router;
