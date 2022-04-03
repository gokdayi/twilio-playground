const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  accountSID: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneSource: process.env.TWILIO_PHONE_NUMBER,
  phoneTarget: process.env.TARGET_NUMBER
};