var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pg = require('pg');
//require module
var encryption = require ('../modules/encryption')
var connection = require('../modules/connection');

//serialize
passport.serializeUser(function (user, passDone ) {
  passDone(null,user.id);
});
//deserialize
passport.deserializeUser(function (id, passDone){
  console.log('in deserialze');
  pg.connect(connection, function(err, client, pgDone){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
      client.query('SELECT * FROM users WHERE id = $1', [id], function(err, result){
        pgDone();
        if(result.rows.length >= 1){
          console.log(result.rows[0]);
          return passDone(null, result.rows[0]);
        }
        if (err){
          console.log(err);
        }
      });
  });
});

passport.use('local', new LocalStrategy(
  {
    passReqToCallback:true,
    usernameField: 'username'
  }, function (req, username, password, passDone) { //passport done
    console.log('hit local strategy');
    pg.connect( connection, function (err, client, pgDone){
      if(err){
        console.log(err);
      }
      client.query('SELECT * FROM users WHERE username = $1', [username], function(err, result){
          pgDone();
          if(err){
            console.log(err);
            return passDone(null, false);
          }else{
            //found something
            console.log(result.rows);
            if(result.rows.length >= 1){
              var passwordDB = result.rows[0].password;
              if( encryption.comparePassword(password, passwordDB)){
                console.log('correct pw');
                return passDone(null, result.rows[0]);
              }

            }
            console.log('nope');
            return passDone(null,false);
          }

      });
    });
  }
));

module.exports = passport;
