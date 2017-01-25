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

//SALT Config
var SALT_FACTOR = 10;

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

//creating pool connection for sessions
var session_con_pool = mysql.createPool(config.config_session_pool_con_options);

//asynchronous function to use in login operation
function login(username, password, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            connection.query('CALL login_user(?)', [username], function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
                        bcrypt.compare(password, rows[0][0].password, function(err, isMatch) {
                            if(err) {
                                connection.release();
                                callback(err, null);
                            } else if(!isMatch) {
                                connection.release();
                                callback(new Error('Password doesn\'t match'));
                            } else {
                                connection.release();
                                callback(null, {fname: rows[0][0].fname, username: rows[0][0].username});
                            }
                        })
                    }
                }
            });
        }
    });
}

//asynchronous function to use for deserializing user
function search_user(username, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            connection.query('CALL search_user(?)', [username], function (err, rows) {
                if (err) {
                    callback(err, null);
                } else {
                    if (!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
                        connection.release();
                        callback(null, { fname: rows[0][0].fname, username: rows[0][0].username});
                    }
                }
            });
        }
    });
}

//asynchronous function to use for signing up new users
function add_user(user, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            bcrypt.genSalt(SALT_FACTOR, {}, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hashedpassword) {
                    user.password = hashedpassword;
                    connection.query('INSERT INTO user VALUES(\''+ user.username + '\', \'' + user.role + '\', \'' + user.station + '\', \'' + user.fname + '\', \'' + user.lname + '\', \'' + user.password + '\', 0);', function (err, rows) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (rows.affectedRows === 0) {
                                connection.release();
                                callback(null, false);
                            } else {
                                connection.release();
                                callback(null, { status: rows});
                            }
                        }
                    });
                });
            });
        }
    });
}
function add_record(record, callback) {
    main_con_pool.getConnection(function(err, connection) {
        if(err) {
            callback(err, null);
        } else {
            connection.query('INSERT INTO record')
        }
    });
}
//exports modules
module.exports.login = login;
module.exports.search_user = search_user;
module.exports.add_user = add_user;
module.exports.session_con_pool = session_con_pool;