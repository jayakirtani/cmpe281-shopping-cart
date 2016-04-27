var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// set up a mongoose model
var OrderSchema = new Schema({
    customerid: {
        type: String,
        required: true
    },
    orderdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalamount : {type : Number ,
                    required : true
    },
    products : [
                {   productid : String ,
                    productname : String,
                    quantity : Number,
                    price : Number
                }
            ]
});

module.exports = mongoose.model('Order', OrderSchema);
