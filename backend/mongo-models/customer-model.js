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

CustomerSchema.methods.comparePassword = function (passw, callback) {
    if (passw === this.password){
        callback(null, true);
    } else {
        callback(null, false);
    } 
};
 
module.exports = mongoose.model('Customer', CustomerSchema);
