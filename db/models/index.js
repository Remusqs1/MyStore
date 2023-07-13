const { User, userSchema } = require('./user.model')
const { Customer, customerSchema } = require('./customer.model')

function setupModels(sequalize) {
  User.init(userSchema, User.config(sequalize))
  Customer.init(customerSchema, Customer.config(sequalize))
  //Other models

  User.associate(sequalize.models)
  Customer.associate(sequalize.models)
}

module.exports = setupModels
