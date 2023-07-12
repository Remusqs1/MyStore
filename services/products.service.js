const { faker } = require('@faker-js/faker')
const boom = require("@hapi/boom")

class ProductsService {

  constructor() {
    this.products = []
    this.generate()
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

  async get() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 3000);
    })

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
