const bcrypt = require("bcrypt");

async function hashing(toHash) {
  const hash = await bcrypt.hash(toHash, 10)
  return hash;
}

async function verify(toVerify) {
  const hash = await hashing(toVerify);
  const isMatch = await bcrypt.compare(toVerify, hash);
  return isMatch;
}

module.exports = { hashing, verify }
