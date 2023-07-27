const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize")

class OrderService {
  async get() {
    const res = await models.Order.findAll({
      include: ['customer']
    });
    return res;
  }

  async getById(id) {
    const res = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      },
        'items'
      ]
    })

    if (!res) {
      throw boom.notFound("Order not found");
    }

    return res;
  }

  async getByUser(userId) {
    const res = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }]
    })

    if (!res) {
      throw boom.notFound("Order not found");
    }
    res.forEach(element => {
      delete element.customer.user.dataValues.password;
    });
    return res;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async createItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
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
