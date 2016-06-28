var express = require('express');
var pg = require('pg');
var bodyParser = require ('body-parser');
var app=express();

var index = require('../routes/index');
var register = require('../routes/register');

app.use (bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.use('/register', register);

app.use('/*', index);

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('listening on port ' + port);
});
