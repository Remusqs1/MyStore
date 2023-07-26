const passport = require("passport");
const LocalStrategy = require("./strategies/local.strategy");

passport.initialize();
passport.use("local", LocalStrategy);

module.exports = passport;
