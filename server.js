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

//custom modules
var router = require(path.join(__dirname, '/routes/router'));
var config = require(path.join(__dirname, '/configurations/config'));

//app
var app = express();

//app middleware

//Reducing security threats using helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"]
        }
    }
}));

app.use(router);

if(cluster.isMaster) {
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
    app.listen(config.config_server_port, config.config_server_ip, function (err) {
        if(err) {
            console.log(err.message);
        } else {
            console.log('Server running at '+ config.config_server_ip + ':'
                            + config.config_server_port + " ---> Process : " + process.pid);
        }
    });
}