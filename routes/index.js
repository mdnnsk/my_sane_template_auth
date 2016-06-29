var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/', passport.authenticate('local',  //uses passport.use('local') from a different file
  {
    successRedirect: '/views/users.html',
    failureRedirect: '/views/failure.html'
  }
));
router.get('/', function (req,res){
  res.sendFile(path.resolve('public/views/index.html'));
});

module.exports=router;
