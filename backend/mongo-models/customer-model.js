var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
 
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
                addreline2 : String,
                city : String,
                state : String,
                zip : String,
                country : String },
    contactnumber : String
});
 
CustomerSchema.pre('save', function (next) {
    var customer = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(customer.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                customer.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
 
module.exports = mongoose.model('Customer', CustomerSchema);
