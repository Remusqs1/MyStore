const { Strategy } = require("passport-local");

const UserService = require("../../../services/users.service");
const userSvc = new UserService();

const localStrategyHandler = async (email, password, done) => {
  try {

    const user = await userSvc.getUserByEmail(email, password)
    return done(null, user);

  } catch (error) {
    return done(error, false);
  }
};

const LocalStrategy = new Strategy({ usernameField: 'email', name: "local" }, localStrategyHandler);
module.exports = LocalStrategy;
