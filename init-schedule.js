const schedule = require('node-schedule');
const { callTargetPhone } = require('./src/logic/calls.repo');

/**
 * Creates scheduled jobs. This function must be invoked at app start once
 */
const initSchedule = () => {
  const job = schedule.scheduleJob('30 * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    // callTargetPhone()
  })

}

module.exports = {
  initSchedule
}