var express = require('express');
var app = express();

/*Added:Imran*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/skeleton');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*Added: Imran: Testing the mongodb connection hosted on the aws*/
//var url = 'mongodb://localhost:27017/test';
var url = 'mongodb://imran:imran@ec2-54-173-134-32.compute-1.amazonaws.com:27017/test';  //change the url with the latest one
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

