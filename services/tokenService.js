var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('../config/config.js');

exports.createToken = (user) => {  
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(3000, "days").unix(),
    };
  return jwt.encode(payload, config.tokenSecret);
};