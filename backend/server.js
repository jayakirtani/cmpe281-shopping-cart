var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var seedDB = true; //for populating the database with data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var mongodb = require("./routes/mongodb.js")(app);
var riakdb = require("./routes/riakdb.js")(app);
var customer = require("./routes/mongodb/customer.js")(app);

if (seedDB) { require('./config/seed'); }
 
var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});