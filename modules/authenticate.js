/**
 * Created by nilupul on 12/30/16.
 */
//Node.js core modules
var path = require('path');

//3rd party modules
var LocalStrategy = require('passport-local');

//custom modules
var mysql_db_operation = require(path.join(__dirname, '/mysql_db_operation'));
var User_Login = require(path.join(__dirname, '/user')).User_Login;

//passport initializing function
function passportAuth_init(passport) {

    //serialize a user in to a session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    //deserialize a user from a session
    passport.deserializeUser(function(user, done) {
        mysql_db_operation.search_user(user.username, function(err, user) {
            if(err) {
                done(err);
            } else {
                done(null, user);
            }
        });
    });

    //passport local strategy to authenticate users
    passport.use('login', new LocalStrategy({},
        function(username, password, done) {
            mysql_db_operation.login(username, password, function(err, db_user) {
                if(err) {
                    done(err);
                } else if(!db_user) {
                    console.log('No User');
                    done(null, false);
                } else {
                    var user = new User_Login(db_user.fname, db_user.username);
                    done(null, user);
                }
            });
        })
    );
}

//exports as a module
module.exports.passportAuth_init = passportAuth_init;