var customer = require('../../mongo-models/customer-model');

var customerRouter = function(app) {

  app.get("/customer", function(req, res) {
    res.send("Hello Customer");
  });

  //API call for new Customer Signup
  app.post('/signup', function(req, res) {
    console.log('email : ' + req.body.email);
    if (!req.body.email || !req.body.password) {
      res.status(200).json({
        success: false,
        msg: 'Please pass name and password.'
      });
    }
    else {
      var newCustomer = new customer({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        contactnumber: req.body.contactnumber
      });

      // save the user
      newCustomer.save(function(err) {
        if (err) {
          console.log('error :' + err);
          return res.status(400).json({
            success: false,
            msg: 'Username already exists.'
          });
        }
        res.status(200).json({
          success: true,
          msg: 'Successful created new Customer.'
        });
      });
    }
  });

  //API call for customer authentication
  app.post('/login', function(req, res) {
    customer.findOne({
      email: req.body.email
    }, function(err, customer) {
      if (err) {
        console.log('error :' + err);
        res.status(500).json({
          success: false,
          msg: 'Authentication failed.'
        });
      }

      if (!customer) {
        res.status(400).json({
          success: false,
          msg: 'Authentication failed. User not found.'
        });
      }
      else {
        // check if password matches
        customer.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right , send success message
            res.status(200).json({
              success: true,
              msg: 'Authenticated'
            });
          }
          else {
            res.status(400).json({
              success: false,
              msg: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    });
  });


};

module.exports = customerRouter;