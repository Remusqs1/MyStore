const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const JWTService = require('../services/jwt.service');
const MailerService = require('../services/mailer.service');

const jwt = new JWTService();
const mailerSvc = new MailerService();

class AuthService {

  async hashing(toHash) {
    const hash = await bcrypt.hash(toHash, 10)
    return hash;
  }

  async verifyPass(loginPass, userPass) {
    const isMatch = await bcrypt.compare(loginPass, userPass);
    return isMatch;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    return jwt.signToken(payload)
  }

  async sendEmail(email) {
    const infoEmail = {
      to: email, // list of receivers
      subject: "NodeApp Email", // Subject line
      text: "Saluton Mondo", // plain text body
      html: "<b>Hallo Welt</b>" // html body
    };
    const res = await mailerSvc.sendMail(infoEmail)
    return res.message;
  }

  async sendRecoveryPassword(email, token) {
    const link = `http://myfrontend.com/recovery?token=${token}`

    const infoEmail = {
      to: email, // list of receivers
      subject: "NodeApp Email - Recovery Password", // Subject line
      html: `Klaku sur la ligilon por rekovri vian pasvorton => ${link}` // html body
    };
    const response = await mailerSvc.sendMail(infoEmail)
    return response;
  }

  async changePassword(user, recoveryToken, newPassword) {
    try {
      if (user.recoveryToken !== recoveryToken) {
        throw boom.unauthorized()
      }

      return this.hashing(newPassword)
    } catch (error) {
      throw boom.unauthorized()
    }
  }

}

module.exports = AuthService
