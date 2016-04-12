var express = require('express');
var signup = require(__dirname +'/routes/signup');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname+'/routes'));



// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/skeleton');
});

app.get('/signup',signup.getSignup);
app.post('/signup', signup.createUser);



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


