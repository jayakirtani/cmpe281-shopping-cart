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
                    productrating : {type : Number , required :true},
                    quantity : {type : Number , required : true},
                    price : {type : Number ,required : true }
                }
            ] ,
    paymentdetails : {  nameoncard : {type : String , required : true} ,
                        cardnumber : {type : String , required : true} ,
                        cvv : String,
                        expirydate : {type : String , required : true} ,
                        billingaddress : {  addrline1 : {type : String , required : true} ,
                                            addrline2 : String,
                                            city : {type : String , required : true} ,
                                            state : {type : String , required : true} ,
                                            zip : {type : String , required : true} ,
                                            country : {type : String , required : true}  
                                        } 

                    }
});

module.exports = mongoose.model('Order', OrderSchema);
