/**
 * Created by nilupul on 12/30/16.
 */
//server listening port
var config_server_port = 3000;
//server host ip
var config_server_ip = '127.0.0.1';

//pool connections options for session store
var config_session_pool_con_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'HomeNumber',
    database: 'sessionstore',
    connectionLimit: 20,
    waitForConnections: true
};

//pool connections options for mysql main connection
var config_main_db_pool_con_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'HomeNumber',
    database: 'meteorologydept',
    connectionLimit: 20,
    waitForConnections: true
};

module.exports.config_server_port = config_server_port;
module.exports.config_server_ip = config_server_ip;
module.exports.config_session_pool_con_options = config_session_pool_con_options;
module.exports.config_main_db_pool_con_options = config_main_db_pool_con_options;