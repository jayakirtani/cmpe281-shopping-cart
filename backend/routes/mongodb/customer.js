
var customer    = require('../../mongo-models/customer-model');

var customerRouter = function(app) {

	app.get("/customer", function(req, res) {
    res.send("Hello Customer");
  });

	app.post('/signup', function(req, res) {
		console.log('email : ' + req.body.email);
    if (!req.body.email || !req.body.password) {
      res.status(200).json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newCustomer = new customer({
        email: req.body.email,
        password: req.body.password
      });
    // save the user
    newCustomer.save(function(err) {
      if (err) {
      	console.log('error :' +err);
        //return res.json(400,{success: false, msg: 'Username already exists.'});
        return res.status(400).json({success: false, msg: 'Username already exists.'});
      }
      res.status(200).json({success: true, msg: 'Successful created new Customer.'});
    });
  }
});

};

module.exports = customerRouter;