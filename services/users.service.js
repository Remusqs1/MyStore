const boom = require("@hapi/boom")
const { models } = require("../libs/sequelize")
const { hashing, verify } = require("../services/auth.service")
const AuthService = require("./auth.service")

const authSvc = new AuthService();

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


  async getByEmail(email) {
    const user = await models.User.findOne({
      where: { email }
    })

    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async create(data) {
    const hash = await authSvc.hashing(data.password)
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
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
