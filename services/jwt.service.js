const jwt = require("jsonwebtoken")
const { config } = require('../config/config');

class JWTService {

  signToken(payload) {
    return jwt.sign(payload, config.jwtSecret)
  }

  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret)
  }

}

module.exports = JWTService
