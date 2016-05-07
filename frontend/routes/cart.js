var express = require('express');
var router = express.Router();
var request = require("request");
var url = require('url');

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


router.route('/removeitem').post(function (req, res) {
    if (!req.session.authorised) {
        res.redirect('/');
        return;
    }
    console.log("/cart/removeitem get");

    var email = req.session.email;
    // var url_parts = url.parse(req.url, true);
    // console.log(url_parts);
    // var query = url_parts.query;
    // console.log(query);
    // var productID = query.p;
    var productID = req.body.p;
    console.log("product ID " + productID);
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


router.route('/createOrder').post(function (req, resm) {
    if (!req.session.authorised) {
        resm.redirect('/');
        return;
    }
    console.log("/cart create order post");
    var postData = {};
    var products = JSON.parse(req.body["cartdetails"]);
    postData.products = [];
    postData.totalamount = 0;
    for(var i = 0; i< products.length; ++i){
        postData.products[i] = {
            productid : products[i].productid,
            productname : products[i].productname,
            productrating : products[i].productrating,
            quantity : products[i].quantity,
            price :products[i].price
        };
        postData.totalamount += products[i].quantity * products[i].price;
    }
    postData.customerid = req.session.email;
    //postData.totalamount = products.length;
    //postData.products = JSON.parse(req.body["cartdetails"]);
    postData.paymentdetails = {};
    postData.paymentdetails.nameoncard = req.body["card-holder-name"];
    postData.paymentdetails.cardnumber = req.body["card-number"];
    postData.paymentdetails.cvv = req.body["cvv"];
    postData.paymentdetails.expirydate = req.body["expiry-month"] + "/" + req.body["expiry-year"];
    postData.paymentdetails.billingaddress = {
        "addrline1": req.body["addrline1"],
        "addrline2": req.body["addrline2"],
        "city": req.body["city"],
        "state": req.body["state"],
        "zip": req.body["zip"],
        "country": req.body["country"]
    };

    console.log("data sent: " + JSON.stringify(postData));
    request.post({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: "http://52.5.167.238:8080/createOrder",
        form: postData
    }, function (error, response, body) {
        console.log("response error:" + error);
        console.log("response body:" + body);
        body =JSON.parse(body);
        if (body.success == true) {
            console.log("success");
            resm.render('catalog', {
                products: req.session.products,
                p : 1,
                addtoCart:2,
                orderCreate :1
            });
        } else {
            console.log("failure");
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
