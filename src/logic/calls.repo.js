const twilio = require('twilio')
const { accountSID, authToken, phoneSource, phoneTarget } = require('../config')

const client = new twilio(accountSID, authToken)


const callTargetPhone = async () => {
  try {
    const result = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: phoneTarget,
      from: phoneSource
    })

    console.log(`Called successfully! ${result}`)

  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  callTargetPhone
}