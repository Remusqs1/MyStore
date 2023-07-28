const boom = require("@hapi/boom")
const { models } = require("../libs/sequelize")
const AuthService = require("./auth.service")

const authSvc = new AuthService();

class UsersService {

  async get() {
    const res = await models.User.findAll({
      include: ['customer']
    });

    const users = res.map(user => {
      const { password, recoveryToken, ...safeUsers } = user.toJSON()
      return safeUsers;
    })

    return users;
  }

  async getById(id) {
    const user = await models.User.findByPk(id)

    if (!user) {
      throw boom.notFound("User not found");
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;

    return user;
  }

  async getUserByEmail(email, password) {
    const user = await this.getByEmail(email);
    // if (!user) throw boom.notFound(); //notFound is not recomended
    if (!user) throw boom.unauthorized();

    const isMatch = await authSvc.verifyPass(password, user.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    return user;
  }

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: { email }
    })

    if (!user) {
      throw boom.unauthorized("User not found");
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
    await user.destroy()
    return { id };
  }

}

module.exports = UsersService
