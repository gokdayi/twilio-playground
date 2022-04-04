const controller = require('../controllers/calls.controller')

module.exports = (app) => {
  app.post('/calls/basic', controller.callMeBasic)
  app.get('/calls/twiml/hello', controller.twiMLHello)
}