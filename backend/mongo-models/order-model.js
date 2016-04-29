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
                {   productid : {type : String , required : true} , 
                    productname : {type: String ,required : true},
                    quantity : {type : Number , required : true},
                    price : {type : Number ,required : true }
                }
            ]
});

module.exports = mongoose.model('Order', OrderSchema);
