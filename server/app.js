var express = require('express');
var pg = require('pg');
var bodyParser = require ('body-parser');
var app=express();
var passport = require('../strategies/user-local.js');
var index = require('../routes/index');
var register = require('../routes/register');
var session = require ('express-session');

app.use (bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialize: false,
  cookie: {maxage: 60000, secure:false}
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/register', register);

app.use('/*', index);

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('listening on port ' + port);
});
