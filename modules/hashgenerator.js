/**
 * Created by nilupul on 12/31/16.
 */
//Node.js core modules
var crypto = require('crypto');

//3rd party modules
var uuid = require('uuid');

//algorithm and secret used to encrypt the session id
var algorithm = 'aes-256-ctr';
var secret = uuid.v4().toString();

//hash generation function
function getHash_Secret(){
    var id = uuid.v4();
    var cipher = crypto.createCipher(algorithm, secret);
    var crypted = cipher.update(id.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return {
        id: id,
        crypted: crypted,
        secret: secret
    };
}

//exports as a module
module.exports.getHash_Secret = getHash_Secret;