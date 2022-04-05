const schedule = require('node-schedule')
const { callTargetPhone } = require('./src/logic/calls.repo')
const tk = require('timekeeper')

/**
 * Creates scheduled jobs. This function must be invoked at app start once
 */
const initSchedule = () => {
  // callPhoneIn30Seconds()
  travelTk(hour, minute, second)
  callPhoneInRangeSchedule({ start: 0, end: 5 }, { hour, minute, second }, 'Run in range')
}

const callPhoneIn30Seconds = () => {
  return schedule.scheduleJob('30 * * * * *', () => {
    console.log('The answer to life, the universe, and everything!')
    callTargetPhone()
  })
}

const scheduleAJobOnTime = (time, callback) => {
  const { second, minute, hour } = time
  return schedule.scheduleJob(`${second} ${minute} ${hour} * * *`, callback)
}

const schedulaAJobOnDate = (date, callback) => schedule.scheduleJob(date, callback)

const callPhoneInRangeSchedule = (range, time, msg) => {
  const { start, end } = range
  const { hour, minute, second } = time

  const rule = new schedule.RecurrenceRule()
  rule.dayOfWeek = [new schedule.Range(start, end)]
  rule.hour = hour
  rule.minute = minute
  rule.second = second

  const cb = () => {
    console.log(msg)
    callTargetPhone()
  }

  return schedule.scheduleJob(rule, cb)
}

const scheduleEveryHour = (minute, callback) => {
  const rule = new schedule.RecurrenceRule()
  rule.minute = minute // Call at the specified minute every hour
  return schedule.scheduleJob(rule, callback)
}

const hour = 19
const minute = 49
const second = 0

/**
 * Travel to specified time for quick testing
 */
const travelTk = (hour, minute, second) => {
  const now = new Date()
  tk.travel(new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute - 1, (second + 55) % 59))
}


module.exports = {
  initSchedule,
  scheduleEveryHour
}