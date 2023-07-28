const express = require('express');
const passport = require('passport');
const OrderService = require("../services/order.service")

const router = express.Router();
const orderSvc = new OrderService();

router.get('/my-orders',
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await orderSvc.getByUser(user.sub)
      res.json(orders);
    } catch (error) {

    }
  });

module.exports = router;
