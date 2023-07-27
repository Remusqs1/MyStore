const express = require('express');
const passport = require('passport');
const JWTService = require('../services/jwt.service');

const router = express.Router();
const jwt = new JWTService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {

      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }

      const token = jwt.signToken(payload)
      res.json({ user, token })
    } catch (error) {
      next(error)
    }
  })

module.exports = router;
