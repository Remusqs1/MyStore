const boom = require("@hapi/boom")
const pool = require("../libs/postgres.pool")

class UsersService {

  tableName = "tasks"

  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err))
  }

  async get() {
    const query = 'SELECT * FROM ' + this.tableName
    const res = await this.pool.query(query);
    return res.rows;
  }

  async getById(id) {
    const query = 'SELECT * FROM ' + this.tableName + ' WHERE id =' + id
    const res = await this.pool.query(query);
    return res.rows[0];
    return myProduct
  }

}

module.exports = UsersService
