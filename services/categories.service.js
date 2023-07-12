const boom = require('@hapi/boom');

class CategoriesService {

  constructor() { }

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

module.exports = CategoriesService
