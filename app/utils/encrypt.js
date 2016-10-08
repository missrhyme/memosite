var crypto = require('crypto');

var encrypt = function (content){
  var shasum = crypto.createHash('sha1');
  shasum.update(content);
  return shasum.digest('hex');
}

module.exports = encrypt;