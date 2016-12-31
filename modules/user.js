/**
 * Created by nilupul on 12/31/16.
 */
var User_Login = function (_sessionID, _fname, _sessionSecret) {
    this.session_id = _sessionID;
    this.fname = _fname;
    this.session_secret = _sessionSecret;
};

module.exports = User_Login;