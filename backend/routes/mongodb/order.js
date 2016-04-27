var Order = require('../../mongo-models/order-model');

var orderRouter = function(app) {


	app.post('/createOrder', function(req, res) {
		if (!req.body.customerid || !req.body.totalamount || !req.body.products) {
			res.status(400).json({
				success: false,
				msg: 'Incorrect Order Information.'
			});
		}
		else 
		{
			var newOrder = new Order({
				customerid: req.body.customerid,
				totalamount: req.body.totalamount,
				products: req.body.products
			});

      		// save the order
      		newOrder.save(function(err) {
      			if (err) {
      				console.log('error :' + err);
      				return res.status(500).json({
      					success: false,
      					msg: 'Error creating order.'
      				});
      			}
      			res.status(200).json({
      				success: true,
      				msg: 'Order Creation Successful.'
      			});
      		});
      	}
      });

};

module.exports = orderRouter;