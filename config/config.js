require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3666,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  recoverySecret: process.env.RECOVERY_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailToken: process.env.EMAIL_TOKEN
}

module.exports = { config };
