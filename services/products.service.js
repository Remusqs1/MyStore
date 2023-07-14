const { faker } = require('@faker-js/faker')
const boom = require("@hapi/boom")
// const pool = require("../libs/postgres.pool")
const { sequalize, models } = require("../libs/sequelize")

class ProductsService {

  tableName = "tasks"

  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err))
    this.sequalize = sequalize; //Sequalize uses pool
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  // This method is an example of a query with pool
  // async get() {
  //   const query = 'SELECT * FROM ' + this.tableName
  //   const res = await this.pool.query(query);
  //   return res.rows;
  // }

  // This method is an example of a query with sequalize
  // async get() {
  //   const query = 'SELECT * FROM ' + this.tableName
  //   const [data] = await this.sequalize.query(query);
  //   return data;
  // }

  async get() {
    const res = await models.Product.findAll({
      include: ['category']
    });
    return res;
  }

  async getById(id) {
    const product = await models.Product.findByPk(id, {
      include: ["category"]
    })

    if (!product) {
      throw boom.notFound("Product not found");
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.getById(id);
    const res = await product.update(changes)
    return res;
  }

  async delete(id) {
    const product = await this.getById(id);
    const res = await product.destroy()
    return { id };
  }

}

module.exports = ProductsService
