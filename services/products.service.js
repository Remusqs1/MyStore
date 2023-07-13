const { faker } = require('@faker-js/faker')
const boom = require("@hapi/boom")
// const pool = require("../libs/postgres.pool")
const sequalize = require("../libs/sequelize")

class ProductsService {

  tableName = "tasks"

  constructor() {
    this.products = []
    this.generate()
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err))
    this.sequalize = sequalize; //Sequalize uses pool
  }

  generate() {
    let limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: index + 1,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: this.products.length + 1,
      isBlock: false,
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  // This methos is an example of a query with pool
  // async get() {
  //   const query = 'SELECT * FROM ' + this.tableName
  //   const res = await this.pool.query(query);
  //   return res.rows;
  // }

  async get() {
    const query = 'SELECT * FROM ' + this.tableName
    const [data] = await this.sequalize.query(query);
    return data;
  }

  async getById(id) {
    const myProduct = this.products.find(x => x.id == id)
    if (!myProduct) throw boom.notFound("Product Not Found")
    if (myProduct.isBlock) throw boom.conflict("Product is blocked")
    return myProduct
  }

  async update(id, data) {
    let index = this.products.findIndex(x => x.id == id)

    if (index < 0) {
      throw boom.notFound("Product Not Found")
    }
    const myProduct = this.products[index]

    this.products[index] = {
      ...myProduct,
      ...data
    }

    return this.products[index]
  }

  async delete(id) {
    let index = this.products.findIndex(x => x.id == id)

    if (index < 0) {
      throw boom.notFound("Product Not Found")
    }
    this.products.splice(index, 1);
    return { id }
  }

  async getBlockProducts() {
    return this.products.filter(x => x.isBlock === true)
  }

}

module.exports = ProductsService
