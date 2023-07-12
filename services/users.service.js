const boom = require("@hapi/boom")
const getConnection = require("../libs/postgres")

class UsersService {

  constructor() { }

  async get() {
    const client = await getConnection();

    const response = await client.query('SELECT * FROM tasks')
    return response.rows;
  }

}

module.exports = UsersService
