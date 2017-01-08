/**
 * Created by nilupul on 12/30/16.
 */
//Node.js core modules
var path = require('path');

//3rd party modules
var express = require('express');
var passport = require('passport');

//Router
var router = express.Router();

router.get('/', function(request, response) {
    if(request.isAuthenticated()) {
        response.send("Hello World");
    } else {
        response.send("Not Allowed");
    }
    console.log('Request Served By PID : ' + process.pid);
});

router.get('/login', function(request, response) {
    response.sendFile(path.join(__dirname, '/../public/login.html'));
});
router.post('/login', function(reqest, response, next) {
        console.log('Request Served By PID : ' + process.pid);
        next();
    }, passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);
router.get('/logout', function(request, response, next) {
    request.logout();
    response.redirect('/login');
    next();
});
module.exports = router;