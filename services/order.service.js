const boom = require('@hapi/boom');

class OrderService {

  constructor(){
  }
  async create(data) {
    return data;
  }

  async get() {
    return [];
  }

  async getById(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
