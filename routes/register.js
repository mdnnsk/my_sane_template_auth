var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connection = require('../modules/connection');


router.get('/', function (req,res){
  res.sendFile(path.resolve('public/views/register.html'));
});

router.post('/', function () {
  console.log("hit register post");
  console.log("username = " , req.body.username);
  console.log("password = " , req.body.password);

  pg.connect(connection, function(err, client, done) {

    client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [req.body.username, req.body.password], function (err, result){
      done();
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        // console.log(result);
        console.log("success", result.rows[0].id);
        res.redirect('/');
      }
    });
  });
});
module.exports=router;
