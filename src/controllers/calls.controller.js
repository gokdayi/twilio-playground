const twilio = require('twilio')
const VoiceResponse = twilio.twiml.VoiceResponse

const { accountSID, authToken, phoneSource, phoneTarget } = require('../config')

const client = new twilio(accountSID, authToken)

exports.callMeBasic = async (req, res) => {
  try {
    const result = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: phoneTarget,
      from: phoneSource
    })

    console.log(result)

    res.status(200).send({
      result
    })

  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

exports.twiMLHello = async (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say('Hello from your pals at Twilio! Have fun.');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}