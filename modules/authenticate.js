/**
 * Created by nilupul on 12/30/16.
 */
//Node.js core modules
var path = require('path');

//3rd party modules
var LocalStrategy = require('passport-local');

//custom modules
var mysql_db_operation = require(path.join(__dirname, '/mysql_db_operation'));

function passportAuth_init(passportAuth) {
    passportAuth.serializeUser(function(user, done) {

    });
    passportAuth.deserializeUser(function(xxx, done) {

    });
    passportAuth.use('login', new LocalStrategy({},
        function(username, password, done) {
            mysql_db_operation.login(username, password, function(err, user) {
                if(err) {
                    done(err);
                } else if(!user) {
                    done(null, false);
                } else {
                    done(null, user);
                }
            });
        })
    );
}