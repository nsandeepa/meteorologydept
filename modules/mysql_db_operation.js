/**
 * Created by nilupul on 12/31/16.
 */
//Node.js core modules
var path = require('path');

//3rd party modules
var mysql = require('mysql');
var bcrypt = require('bcrypt');

//custom modules
var config = require('../configurations/config');

var SALT_FACTOR = 10;
var con_pool = mysql.createPool(config.config_main_db_pool_con_options);

function login(username, password, callback) {
    con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            connection.query('SELECT username, password FROM users WHERE username = ?',[username], function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
                        bcrypt.compare(password, rows[0].password, function(err, isMatch) {
                            if(err) {
                                connection.release();
                                callback(err, null);
                            } else if(!isMatch) {
                                connection.release();
                                callback(new Error('Incorrect Password'));
                            } else {
                                connection.release();
                                callback(null, rows[0].username);
                            }
                        })
                    }
                }
            });
        }
    });
}

module.exports.login = login;