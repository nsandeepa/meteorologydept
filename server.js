/**
 * Created by nilupul on 12/30/16.
 */
//Node.js core modules
var cluster = require('cluster');
var path = require('path');
var os = require('os');

//3rd party modules
var express = require('express');
var helmet = require('helmet');
var mysql = require('mysql');
var session = require('express-session');
var sessionStore = require('express-mysql-session')(session);
var passport = require('passport');
var bodyparser = require('body-parser');

//custom modules
var router = require(path.join(__dirname, '/routes/router'));
var config = require(path.join(__dirname, '/configurations/config'));
var hashGen = require(path.join(__dirname, '/modules/hashgenerator'));
var mysql_db_operation = require(path.join(__dirname, '/modules/mysql_db_operation'));
var authentication = require(path.join(__dirname, '/modules/authenticate'));

//app
var app = express();

//Reducing security threats using helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"]
        }
    }
}));

//initializing passport strategies
authentication.passportAuth_init(passport);

//session middleware
app.use(session({
        key: 'sessionID',
        secret: config.config_session_secret,
        store: new sessionStore({}, mysql_db_operation.session_con_pool),
        resave: false,
        saveUninitialized: true,
        genid: function (request) {
            return hashGen.getHash_Secret().crypted;
        },
        cookie: {
            maxAge: 1800000
        }
    }
));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//body parser middleware to parse user data
app.use(bodyparser.urlencoded({extended: false}));

//including custom router middleware
app.use(router);

//using server in a clustered environment
if(cluster.isMaster) {
    //creating child processes
    var numClusters = 8;
    for (var i = 0; i < numClusters; i++) {
        cluster.fork();
    }
    console.log('--------------------------'
                    + '\nServer Details :'
                    + '\nCPU : ' + os.cpus()[0].model
                    + '\nNumber of cores : ' + os.cpus().length
                    + '\nOS : ' + os.type() + ' ' + os.release()
                    + '\n--------------------------');
    console.log('Number of Node Clusters : ' + numClusters
                    + '\n--------------------------');
} else {
    //server listening on child processes
    app.listen(config.config_server_port, config.config_server_ip, function (err) {
        if(err) {
            console.log(err.message);
        } else {
            console.log('Server running at '+ config.config_server_ip + ':'
                            + config.config_server_port + " ---> Process : " + process.pid);
        }
    });
}