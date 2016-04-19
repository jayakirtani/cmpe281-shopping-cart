var express = require("express");
var bodyParser = require("body-parser");
var mongoose    = require('mongoose');
var config      = require('./config/mongoConnect');
var app = express();
var seedDB = false; //for populating the database with data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Connect to Mongo Instance
mongoose.connect(config.database);
 
var mongodb = require("./routes/mongodb.js")(app);
var riakdb = require("./routes/riakdb.js")(app);
var customer = require("./routes/mongodb/customer.js")(app);
var product = require("./routes/mongodb/products.js")(app);
var order = require("./routes/mongodb/order.js")(app);

if (seedDB) { require('./config/seed'); }
 
var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});