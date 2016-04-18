var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// set up a mongoose model
var CustomerSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname : String,
    lastname : String,
    address : { addrline1 : String,
                addrline2 : String,
                city : String,
                state : String,
                zip : String,
                country : String },
    contactnumber : String
});
 
module.exports = mongoose.model('Customer', CustomerSchema);
