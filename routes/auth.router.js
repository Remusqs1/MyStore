const boom = require("@hapi/boom");
const passport = require('passport');
const express = require('express');

const AuthService = require('../services/auth.service');
const UserService = require("../services/users.service");
const JWTService = require('../services/jwt.service');

const router = express.Router();
const authSvc = new AuthService();
const userSvc = new UserService();
const jwt = new JWTService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = authSvc.signToken(user);
      delete user.dataValues.recoveryToken;
      res.json({ user, token })
    } catch (error) {
      next(error)
    }
  })

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userSvc.getByEmail(email);
      if (!user) throw boom.unauthorized();

      const payload = { sub: user.id }
      const token = jwt.signRecoveryToken(payload);
      const send = await authSvc.sendRecoveryPassword(email, token)

      if (send.success) {
        userSvc.update(user.id, { recoveryToken: token })
      }

      res.json(send)
    } catch (error) {
      next(error)
    }
  })

//TODO Validate with Joi
router.post('/change-password',
  async (req, res, next) => {
    try {

      const { token, newPassword } = req.body;
      const payload = jwt.verifyRecoveryToken(token)
      const user = await userSvc.getById(payload.sub);
      const hashedPass = await authSvc.changePassword(user, token, newPassword);
      await userSvc.update(user.id, { password: hashedPass })
      res.json({ message: "password was updated" })
    } catch (error) {
      next(error)
    }
  })
module.exports = router;
