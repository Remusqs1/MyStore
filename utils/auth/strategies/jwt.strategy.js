const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const JWTService = require("../../../services/jwt.service");
const { config } = require("../../../config/config");

const jwtSvc = new JWTService();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const jwtStrategyHandler = (payload, done) => {
  return done(null, payload)
};

const JWTStrategy = new Strategy(options, jwtStrategyHandler);

module.exports = JWTStrategy;
