const { scheduleEveryHour } = require('./init-schedule')
const schedule = require('node-schedule')
const tk = require('timekeeper')
const { callTargetPhone } = require('./src/logic/calls.repo')

const hour = 19
const minute = 49
const second = 0
const deltaSecond = 2

const msg = 'Scheduled job happened'

/**
 * Travel the time to {delta} seconds before the target time 
 */
const travelTime = (hour, minute, second, delta) => {
  const now = new Date()
  tk.travel(new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute - 1, (second + (60 - deltaSecond)) % 59))
}

describe('call in range', () => {
  test('Recurring job should run in range', done => {

    const range = { start: 0, end: 5 }
    const time = { hour, minute, second }

    const rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = [new schedule.Range(range.start, range.end)]
    rule.hour = time.hour
    rule.minute = time.minute
    rule.second = time.second

    const cb = () => {
      console.log(msg)
      expect(console.log.mock.calls[0][0]).toEqual(msg)
      done()
    }

    schedule.scheduleJob(rule, cb)
  })

  test('Job on specific time should run successfully', done => {
    // we should travel to the starting time to make sure that the test won't fail
    travelTime(hour, minute, second, deltaSecond)

    const cb = () => {
      console.log(msg)
      expect(console.log.mock.calls[0][0]).toEqual(msg)
      done()
    }

    schedule.scheduleJob(`${second} ${minute} ${hour} * * *`, cb)
  })

  test('Call at every hour at specified minute', done => {
    travelTime(hour, minute, second, deltaSecond)
    const cb = () => {
      try {
        // const msg = 'Calling the phone now'
        console.log(msg)
        callTargetPhone() 
        expect(console.log.mock.calls[0][0]).toEqual(msg)
        done()
      } catch (error) {
        done(error)
      }
    }

    scheduleEveryHour(minute, cb)
  })
})

beforeAll(() => {
  // If not for the time-travel, test would fail because the total delta seconds will probably exceed jest timeout
  travelTime(hour, minute, second, deltaSecond)
  jest.spyOn(console, 'log')
})

afterAll(() => {
  tk.reset()
  console.log.mockRestore()
})