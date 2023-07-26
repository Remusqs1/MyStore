const bcrypt = require("bcrypt");

class AuthService {

  constructor() {

  }

  async hashing(toHash) {
    const hash = await bcrypt.hash(toHash, 10)
    return hash;
  }

  async verifyPass(loginPass, userPass) {
    const isMatch = await bcrypt.compare(loginPass, userPass);
    return isMatch;
  }

}

module.exports = AuthService
