const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize")

class CategoriesService {

  constructor() { }

  async create(data) {
    const newCategory = await models.Category.create(data)
    return newCategory;
  }

  async get() {
    const res = await models.Category.findAll({
      include: ['products']
    });
    return res;
  }

  async getById(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })

    if (!category) {
      throw boom.notFound("Category not found");
    }

    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async update(id, changes) {
    const category = await this.getById(id);
    const res = await category.update(changes)
    return res;
  }

  async delete(id) {
    const category = await this.getById(id);
    const res = await category.destroy()
    return { id };
  }

}

module.exports = CategoriesService
