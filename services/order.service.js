const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize")

class OrderService {

  constructor() {
  }
  async get() {
    const res = await models.Order.findAll({
      include: ['customer']
    });
    return res;
  }

  async getById(id) {
    const res = await models.Order.findByPk(id, {
      include: ["customer"]
    })

    if (!res) {
      throw boom.notFound("Order not found");
    }

    return res;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async update(id, changes) {
    const order = await this.getById(id);
    const res = await order.update(changes)
    return res;
  }

  async delete(id) {
    const order = await this.getById(id);
    const res = await order.destroy()
    return { id };
  }

}

module.exports = OrderService;
