/**
 * Created by nilupul on 12/30/16.
 */
var b  = require('bcrypt');
b.genSalt(10, function (err, salt) {
    b.hash('1', salt, function (err, hash) {
        console.log(hash);
    });
});
/*
var mysql_db_operation = require('./modules/mysql_db_operation');
mysql_db_operation.login('nilupuls', '1', function cb(err, user) {
    if(err) {
        console.log(err);
    } else {
        if(!user) {
            console.log('no user');
        } else {
            console.log(user);
        }
    }
});
/*function lol(name, number, val, callback) {
    var username = name.toString() + number.toString();
    callback(username);
}

lol("nidlupul", "Sandeepa", 1, function cb(username) {
    console.log(username);
});

console.log('Me');


lol("nilupul", "Sandeepa", 1, function cb(username) {
    console.log(username);
});
console.log('After db');*/
