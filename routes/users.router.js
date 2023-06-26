const express = require("express");
const UsersService = require("../services/users.service");

const router = express.Router()
const userService = new UsersService();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  }
  else res.send("None param sent")
})

module.exports = router;
