const { User, userSchema } = require('./user.model')

function setupModels(sequalize){
  User.init(userSchema, User.config(sequalize))
  //Other models
}

module.exports = setupModels
