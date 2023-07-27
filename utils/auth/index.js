const passport = require("passport");
const LocalStrategy = require("./strategies/local.strategy");
const JWTStrategy = require("./strategies/jwt.strategy");

passport.initialize();
passport.use("local", LocalStrategy);
passport.use("jwt", JWTStrategy);

module.exports = passport;
