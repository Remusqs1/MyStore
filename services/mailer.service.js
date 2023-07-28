const nodemailer = require("nodemailer");
const { config } = require("../config/config")

class MailerService {

  createTransport() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailToken
      }
    })

    return transporter;
  }

  async sendMail(infoMail) {
    try {
      const transporter = this.createTransport()
      infoMail.from = config.emailUser;
      let info = await transporter.sendMail(infoMail);
      return { message: 'email sended', success: true };
    } catch (error) {
      return { message: 'error', success: false };
    }
  }
}

module.exports = MailerService
