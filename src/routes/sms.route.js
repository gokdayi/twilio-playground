const controller = require('../controllers/sms.controller')

module.exports = (app) => {
  app.post('/smsplay/basic', controller.sendbasic)
  app.post('/smsplay/message', controller.sendmessage)
}