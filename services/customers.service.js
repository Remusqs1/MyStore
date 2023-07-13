const boom = require("@hapi/boom")
const { models } = require("../libs/sequelize")

class CustomersService {

  constructor() {

  }

  async get() {
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  }

  async getById(id) {
    const customer = await models.Customer.findByPk(id)

    if (!customer) {
      throw boom.notFound("Customer not found");
    }

    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async createWithUser(data) {
    //Example creating the user first
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    // });

    //as user is in data, sequalize uses the asociation to create it too
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const user = await this.getById(id);
    const res = await user.update(changes)
    return res;
  }

  async updateWithUser(id, changes) {
    const user = await this.getById(id);
    const res = await user.update(changes)
    return res;
  }

  async delete(id) {
    const customer = await this.getById(id);
    const res = await user.destroy()
    return { id };
  }

}

module.exports = CustomersService
