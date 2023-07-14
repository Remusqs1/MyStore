const { User, userSchema } = require('./user.model')
const { Customer, customerSchema } = require('./customer.model')
const { Category, categorySchema } = require('./category.model')
const { Product, productSchema } = require('./product.model')
const { Order, orderSchema } = require('./order.model')

function setupModels(sequalize) {
  User.init(userSchema, User.config(sequalize))
  Customer.init(customerSchema, Customer.config(sequalize))
  Category.init(categorySchema, Category.config(sequalize))
  Product.init(productSchema, Product.config(sequalize))
  Order.init(orderSchema, Order.config(sequalize))


  User.associate(sequalize.models)
  Customer.associate(sequalize.models)
  Category.associate(sequalize.models)
  Product.associate(sequalize.models)
  Order.associate(sequalize.models)
}

module.exports = setupModels
