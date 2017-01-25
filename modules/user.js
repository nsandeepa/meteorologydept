/**
 * Created by nilupul on 12/31/16.
 */
//user object for login and signup
var User_Login = function (_fname, _username) {
    this.fname = _fname;
    this.username = _username;
};

var User_SignUp = function(_username, _role, _station, _fname, _lname, _password) {
    this.username = _username;
    this.role = _role;
    this.station =  _station;
    this.fname = _fname;
    this.lname = _lname;
    this.password = _password;
}
module.exports.User_Login = User_Login;
module.exports.User_SignUp = User_SignUp;
module.exports.User_SignUp;