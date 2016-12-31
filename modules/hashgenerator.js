/**
 * Created by nilupul on 12/31/16.
 */
//Node.js core modules
var crypto = require('crypto');

//3rd party modules
var uuid = require('uuid');

var algorithm = 'aes-256-ctr';
var secret = uuid.v4();

function getHash_Secret(){
    var cipher = crypto.createCipher(algorithm, secret);
    var crypted = cipher.update(uuid.v4(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return {
        crypted: crypted,
        secret: secret
    };
}

module.exports.getHash_Secret = getHash_Secret;