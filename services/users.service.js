const boom = require("@hapi/boom")
const { models } = require("../libs/sequelize")

class UsersService {

  constructor() {

  }

  async get() {
    const res = await models.User.findAll({
      include: ['customer']
    });
    return res;
  }

  async getById(id) {
    const user = await models.User.findByPk(id)

    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, changes) {
    const user = await this.getById(id);
    const res = await user.update(changes)
    return res;
  }

  async delete(id) {
    const user = await this.getById(id);
    const res = await user.destroy()
    return { id };
  }

}

module.exports = UsersService
