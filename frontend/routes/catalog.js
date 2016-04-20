var express = require('express');
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
router.use('/catalog', isAuthenticated);

router.route('/catalog')
    // Not useful now. Can be later if catalog adding added for admin console
    // .post(function(req, res){

    //     // Todo add to cart and update cart on UI

    //     // var post = new Post();
    //     // post.text = req.body.text;
    //     // post.created_by = req.body.created_by;
    //     // post.save(function(err, post) {
    //     //     if (err){
    //     //         return res.send(500, err);
    //     //     }
    //     //     return res.json(post);
    //     // });
    // })

    //gets all posts
    .get(function(req, res){
        // Todo fetch catalog from databse
        // console.log('debug1');
        // Post.find(function(err, posts){
        //     console.log('debug2');
        //     if(err){
        //         return res.send(500, err);
        //     }
        //     return res.send(200,posts);
        // });
    });

//post-specific commands. likely won't be used
router.route('/catalog/:id')
    //gets specified post
    .get(function(req, res){
        // Todo send json of one catalog product
        // Post.findById(req.params.id, function(err, post){
        //     if(err)
        //         res.send(err);
        //     res.json(post);
        // });
    });

    // Not useful now. Can be later if catalog adding added for admin console
    // 
    // //updates specified post
    // .put(function(req, res){
    //     Post.findById(req.params.id, function(err, post){
    //         if(err)
    //             res.send(err);

    //         post.created_by = req.body.created_by;
    //         post.text = req.body.text;

    //         post.save(function(err, post){
    //             if(err)
    //                 res.send(err);

    //             res.json(post);
    //         });
    //     });
    // })
    // //deletes the post
    // .delete(function(req, res) {
    //     Post.remove({
    //         _id: req.params.id
    //     }, function(err) {
    //         if (err)
    //             res.send(err);
    //         res.json("deleted :(");
    //     });

module.exports = router;