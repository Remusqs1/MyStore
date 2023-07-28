const jwt = require("jsonwebtoken")
const { config } = require('../config/config');

class JWTService {

  signToken(payload) {
    return jwt.sign(payload, config.jwtSecret)
  }

  signRecoveryToken(payload) {
    return jwt.sign(payload, config.recoverySecret, { expiresIn: "15min" })
  }

  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret)
  }

  verifyRecoveryToken(token) {
    return jwt.verify(token, config.recoverySecret)
  }

}

module.exports = JWTService
