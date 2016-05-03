var Order = require('../../mongo-models/order-model');

var orderRouter = function(app) {

      //To create customer order
	app.post('/createOrder', function(req, res) {
	     if (!req.body.customerid || !req.body.totalamount || !req.body.products || !req.body.paymentdetails) {
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
				products: req.body.products,
                        paymentdetails : req.body.paymentdetails
			});

      		// save the order
      		newOrder.save(function(err) {
      			if (err) {
      				console.log('error :' + err);
      				return res.status(400).json({
      					success: false,
      					msg: 'Error Creating Order. Verify your Order Details'
      				});
      			}
      			res.status(200).json({
      				success: true,
      				msg: 'Order Creation Successful.'
      			});
      		});
      	}
      });

      // To retrive customers order history
      app.get ('/getOrderHistory/:customerid' , function(req, res){
            //find order history for customerid provided and exclude paymentdetails and some other fields from output
            Order.find({customerid : req.params.customerid} ,{"products._id" : 0 , paymentdetails :0 , __v :0} , function (err, orders){
                  if (err){
                        console.log('Error :' + err);
                        res.status(400).json({success : false , msg : 'Error fetching Customer Order History' });
                  }

                  res.status(200).json(orders);
            });
      });

};

module.exports = orderRouter;